import pandas as pd
from fastapi import FastAPI
from fastapi.responses import ORJSONResponse
from fastapi.middleware.cors import CORSMiddleware
import pyterrier as pt

if not pt.started():
    pt.init()

from modules.indexer import Indexer
from modules.sanitizer import sanitize_query
from modules.response import format_response

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
relevance_scores = {} # where key is beer_id and value is relevance score
ordered_docs = {}
current_top = 100

# Load index and build retrieval model
index = pt.IndexFactory.of(INDEX_PATH)  # type: ignore
model = pt.BatchRetrieve(index, wmodel="BM25")  # type: ignore

# Create FastAPI app + CORS middleware
app = FastAPI(response_class=ORJSONResponse)
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

# Function to calculate relevance scores based on query results
def compute_relevance_scores(results):
    relevance_scores = {}

    # Iterate through the results and aggregate relevance signals
    for beer_id in results['docno']:
        relevance_scores[beer_id] = results[results['docno'] == beer_id]['score'].values[0]
    return relevance_scores

# Example URL: /api/v1/search?query=beer&top=10
@app.get("/api/v" + API_VERSION + "/search")
def search(query: str, top: int = 100):
    # Search documents by query
    results = model.search(sanitize_query(query))
    global relevance_scores
    relevance_scores = compute_relevance_scores(results)

    # Retrieve the document ids from the results
    ids = results["docno"].tolist()

    # Sort the document IDs based on relevance scores
    ids.sort(key=lambda x: relevance_scores.get(x, 0), reverse=True)

    # Select only the top results
    top = min(top, len(ids))
    global current_top
    current_top = top
    ids = ids[:top]

    # Reorder the documents based on relevance scores
    global ordered_docs
    ordered_docs = df[df["docno"].isin(ids)].copy()
    ordered_docs["relevance_score"] = ordered_docs["docno"].map(relevance_scores)  # Add relevance scores to the DataFrame
    ordered_docs = ordered_docs.sort_values(by="relevance_score", ascending=False).reset_index(drop=True)
    # ordered_docs = ordered_docs.drop(columns=["relevance_score"])  # Drop the temporary relevance_score column (if we don't want it to be available in the frontend)
    
    # Return the documents as JSON
    return ORJSONResponse(
        format_response(
            ordered_docs.to_dict(orient="records"),
            ordered_docs.shape[0]
        )
    )


# Example URL: /api/v1/feedback?id=1&query=beer&positive=true
@app.get("/api/v" + API_VERSION + "/feedback")
def feedback(id: str, positive: bool):
    
    feedback = 1
    
    # We could eventually think of something like that to adjust the feedback change based on the scores.
    # global relevance_scores
    # values = relevance_scores.values()
    # max_score = max(values)
    # min_score = min(values)
    # score_range = max_score - min_score
    # # Calculate the adjustment factor relative to the score range
    # global current_top
    # feedback = feedback * (score_range / current_top)

    if not positive:
        feedback = -feedback
    relevance_scores[id] += feedback
    global ordered_docs
    ordered_docs["relevance_score"] = ordered_docs["docno"].map(relevance_scores)  # Add relevance scores to the DataFrame
    ordered_docs = ordered_docs.sort_values(by="relevance_score", ascending=False).reset_index(drop=True)
    # ordered_docs = ordered_docs.drop(columns=["relevance_score"])  # Drop the temporary relevance_score column (if we don't want it to be available in the frontend)

    # Return the documents as JSON
    return ORJSONResponse(
        format_response(
            ordered_docs.to_dict(orient="records"),
            ordered_docs.shape[0]
        )
    )