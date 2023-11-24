from typing import Union

import pandas as pd
from fastapi import FastAPI
import pyterrier as pt

if not pt.started():
    pt.init()

from modules.indexer import Indexer

# Constants
DATASET_PATH = "../data/data.jsonl"
INDEX_PATH = "./.beer-index"
API_VERSION = "1"


def load_documents(path: str):
    # Load the documents from the dataset
    docs = Indexer.load_dataset(path)

    # Load documents inside dataframe
    df = pd.DataFrame(docs)

    # Use column "docno" as index
    df.set_index("docno")

    # Return dataframe
    return df


# Load dataframe
df = load_documents(DATASET_PATH)

# Load index and build retrieval model
index = pt.IndexFactory.of(INDEX_PATH)
model = pt.BatchRetrieve(index, wmodel="BM25")

app = FastAPI()


@app.get("/api/v" + API_VERSION + "/search")
def search(query: str, top: int = 10):
    # Search query
    results = index.search(query)
    print(results)

    # Return results
    return results.head(top)


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
