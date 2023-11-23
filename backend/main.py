from typing import Union

from fastapi import FastAPI

app = FastAPI()

# TODO: Load documents from dataset + load index and build retrival modal using PyTerrier


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
