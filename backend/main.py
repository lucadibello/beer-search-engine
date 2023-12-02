from pydoc import doc
from typing import Union

import pandas as pd
from fastapi import FastAPI
from fastapi.responses import ORJSONResponse
from fastapi.middleware.cors import CORSMiddleware
import pyterrier as pt

if not pt.started():
    pt.init()

from modules.indexer import Indexer
from modules.sanitizer import sanitize_query

# Constants
DATASET_PATH = "../data/data.jsonl"
INDEX_PATH = "./.beer-index"
FRONTEND_URL = "http://localhost:3000"
API_VERSION = "1"


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
index = pt.IndexFactory.of(INDEX_PATH)  # type: ignore
model = pt.BatchRetrieve(index, wmodel="BM25")  # type: ignore

# Create FastAPI app + CORS middleware
app = FastAPI(default_response_class=ORJSONResponse)
origins = [
    FRONTEND_URL
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)


# Example URL: /api/v1/search?query=beer&top=10
@app.get("/api/v" + API_VERSION + "/search")
def search(query: str, top: int = 100):
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
    return ordered_docs.to_dict("records")
