import pyterrier as pt
import pandas as pd
import json
import os
from typing import TypedDict, List


# Define type for document item to index
class Document(TypedDict):
    docno: str
    text: str


class Indexer:
    def __init__(self, index_destination_path: str, dataset_path: str):
        # Initialize the indexer
        self._init_indexer()

        # Save index path
        self.index_destination_path = index_destination_path
        self.dataset_path = dataset_path

    def _init_indexer(self):
        if not pt.started():
            pt.init()

    def load_dataset(self) -> List[Document]:
        """
        Loads a dataset from a jsonl file and returns it as a pandas dataframe.

        Parameters
        ----------
        dataset_path : str
            Path to the dataset file.
        """

        # Ensure that the file exists + has jsonl extension
        if not os.path.isfile(self.dataset_path):
            raise FileNotFoundError("Dataset file not found")
        if not self.dataset_path.endswith(".jsonl"):
            raise ValueError("Dataset file must be in jsonl format")

        # Read and process JSON Lines file
        json_objects = []
        with open(self.dataset_path, "r") as jsonl_file:
            json_objects = [json.loads(line) for line in jsonl_file]

        # Now, prepare dataset
        def process_json_object(obj):
            # Join the field values with space
            text = " ".join([str(value) for value in obj.values()])
            return text

        # Generate documents list using list comprehension
        documents = [
            Document(docno=f"d{i+1}", text=process_json_object(obj))
            for i, obj in enumerate(json_objects)
        ]

        # Convert file into pandas dataframe
        return documents

    def create_index(
        self,
        documents: List[Document],
        overwrite=False,
        stemmer="porter",
        stopwords="terrier",
        tokeniser="UTFTokeniser",
        threads=1,
    ):
        # Create directory if not exists
        if not os.path.exists(self.index_destination_path):
            os.makedirs(self.index_destination_path)

        # Create + start indexer
        indexer = pt.IterDictIndexer(
            self.index_destination_path,
            overwrite=overwrite,
            stemmer=stemmer,
            stopwords=stopwords,
            tokeniser=tokeniser,
            threads=threads,
        )
        index_ref = indexer.index(documents, meta=["docno"])
        # Save value as singlethon
        return index_ref

    @staticmethod
    def retrieve_index(index_ref):
        return pt.IndexFactory.of(index_ref)
