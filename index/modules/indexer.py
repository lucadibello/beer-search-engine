# imports
import pyterrier as pt
import pandas as pd
import json
import os


class Indexer:
    def __init__(self, index_destination_path: str, dataset_path: str):
        # Initialize the indexer
        self._init_indexer()

        # Save index path
        self.index_destination_path = index_destination_path

        # Load the dataset
        self._dataset = self._load_jsonl_dataset(dataset_path)

    def _init_indexer(self):
        if not pt.started():
            pt.init()

    def _load_jsonl_dataset(self, dataset_path: str) -> pd.DataFrame:
        """
        Loads a dataset from a jsonl file and returns it as a pandas dataframe.

        Parameters
        ----------
        dataset_path : str
            Path to the dataset file.
        """

        # Ensure that the file exists + has jsonl extension
        if not os.path.isfile(dataset_path):
            raise FileNotFoundError("Dataset file not found")
        if not dataset_path.endswith(".jsonl"):
            raise ValueError("Dataset file must be in jsonl format")

        # Read and process JSON Lines file
        json_objects = []
        with open(dataset_path, "r") as jsonl_file:
            json_objects = [json.loads(line) for line in jsonl_file]

        # Now, prepare dataset
        def process_json_object(obj):
            # Join the field values with space
            text = " ".join([str(value) for value in obj.values()])
            return text

        # Generate documents list using list comprehension
        documents = [
            {"docno": f"d{i+1}", "text": process_json_object(obj)}
            for i, obj in enumerate(json_objects)
        ]

        # Convert file into pandas dataframe
        return pd.DataFrame(documents)

    def create_index(self, overwrite=False):
        # Create directory if not exists
        if not os.path.exists(self.index_destination_path):
            os.makedirs(self.index_destination_path)

        # Paths join
        indexer = pt.DFIndexer(self.index_destination_path, overwrite=overwrite)
        index_ref = indexer.index(self._dataset["text"], self._dataset["docno"])
        # Save value as singlethon
        return pt.IndexFactory.of(index_ref)
