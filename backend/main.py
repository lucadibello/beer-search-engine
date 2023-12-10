import pandas as pd
from fastapi import FastAPI, Body
from fastapi.responses import ORJSONResponse
from fastapi.middleware.cors import CORSMiddleware
import pyterrier as pt

if not pt.started():
    pt.init()

from modules.indexer import Indexer
from modules.sanitizer import sanitize_query
from modules.response import format_response
from typing import List

# Constants
DATASET_PATH = "../data/data.jsonl"
INDEX_PATH = "./.beer-index"
FRONTEND_URL = "http://localhost:3000"
API_VERSION = "1"
MAX_DOCUMENTS = 100

def load_documents(path: str):
    # Load the documents from the dataset
    docs = Indexer.load_dataset(path)

    # Load documents inside dataframe
    df = pd.DataFrame(docs)

    # Use column "docno" as index
    df.set_index("docno")

    # Count nan / null values
    print(df.dtypes)
    print(df.isnull().sum())

    # Return dataframe
    return df


# Load dataframe
df = load_documents(DATASET_PATH)

# Load index and build retrieval model
index = pt.IndexFactory.of(INDEX_PATH) # type: ignore
model = pt.BatchRetrieve(index, wmodel="BM25") % MAX_DOCUMENTS  # type: ignore

# Create FastAPI app + CORS middleware
app = FastAPI(response_class=ORJSONResponse)
origins = [
    FRONTEND_URL
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


# Example URL: /api/v1/search?query=beer&top=10
@app.get("/api/v" + API_VERSION + "/search")
async def search(query: str, top: int = MAX_DOCUMENTS):
    # If top is higher than 20, set it to 20
    if top > MAX_DOCUMENTS:
        raise ValueError("Top cannot be higher than " + str(MAX_DOCUMENTS))
    
    # Search documents by query
    results = model.search(sanitize_query(query))

    # Retrieve the document ids from the results
    ids = results["docno"].tolist()

    # Select only the top results
    top = min(top, len(ids))
    ids = ids[:top]

    # Create a DataFrame for ordering
    order_df = pd.DataFrame({"docno": ids, "order": range(len(ids))})

    # Merge with the original DataFrame
    merged_docs = order_df.merge(df, on="docno").sort_values(by="order")

    # Drop the temporary ordering column and reset index
    ordered_docs = merged_docs.drop(columns=["order"]).reset_index(drop=True)
    
    # Return the documents as JSON
    return ORJSONResponse(
        format_response(
            ordered_docs.to_dict(orient="records"),
            ordered_docs.shape[0]
        )
    )

# POST API for relevance feedback
@app.post("/api/v" + API_VERSION + "/feedback")
async def feedback(query: str = Body(...), relevant: List[str] = Body(...), irrelevant: List[str] = Body(...), top: int = Body(MAX_DOCUMENTS)):
    if top > MAX_DOCUMENTS:
        raise ValueError("Top cannot be higher than " + str(MAX_DOCUMENTS))
    
    # Search documents by query
    results = model.search(sanitize_query(query))
    
    # Check if query can be expanded
    if len(relevant) > 0:
        # Extract a dataframe of relevant / irrelevant documents from the dataframe
        relevant_df = results[results["docno"].isin(relevant)]
        
        # Create query expansion object
        klqe = pt.rewrite.KLQueryExpansion(index, fb_docs=relevant_df.shape[0], fb_terms=5) # type: ignore
        query = klqe.transform(relevant_df)["query"][0]
    
    # Search again with the new query
    results = model.search(sanitize_query(query))
    ids = [x for x in results["docno"].tolist() if x not in relevant and x not in irrelevant]
    top = min(top, len(ids))
    ids = ids[:top]
    order_df = pd.DataFrame({"docno": ids, "order": range(len(ids))})
    merged_docs = order_df.merge(df, on="docno").sort_values(by="order")
    ordered_docs = merged_docs.drop(columns=["order"]).reset_index(drop=True)
    return ORJSONResponse(
        format_response(
            ordered_docs.to_dict(orient="records"),
            ordered_docs.shape[0],
            {
                "new_query": query,
            }
        )
    )