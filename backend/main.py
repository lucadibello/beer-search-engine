from typing import Union

import pandas as pd
from fastapi import FastAPI
import pyterrier as pt

from modules.indexer import Indexer


def load_documents(path: str):
    # Load the documents from the dataset
    docs = Indexer.load_dataset(path)

    # Spread nested dicts into the main dict
    docs = [pd.json_normalize(doc) for doc in docs]
    
    

    # Return dataframe
    return df


# Load dataframe
df = load_documents("../data/data.jsonl")

app = FastAPI()

# TODO: Load documents from dataset + load index and build retrival modal using PyTerrier


@app.get("/")
def read_root():
    return df.iloc[0].to_dict()


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
