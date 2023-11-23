import pyterrier as pt
import pandas as pd
import json
import os
from typing import TypedDict, List


# Define type for document item to index
class IndexDocument(TypedDict):
    docno: str
    text: str


class CriticScore(TypedDict):
    max: float
    actual: float


class Brewer(TypedDict):
    name: str
    city: str
    country: dict
    state: dict


class Document(TypedDict):
    ## Example JSON line entry: {"name": "Cigar City Hunahpu's Imperial Stout - Bourbon Barrel Aged", "description": "Central to Mayan mythology is the story of twin brothers named Xbalanque and Hunahpu, the Hero Twins. After the Twins’ father was murdered by evil deities from Xibalba, his corpse became a cacao tree that spawned our two Heroes. Epic adventures followed, culminating in a journey to Xibalba to avenge their fathers’ death. Vanquishing their enemies handily, the Heroes then ascended unto the heavens where they became the sun and the moon. Imperial Stout brewed with ancho and pasilla chile peppers, cinnamon, vanilla and cacao nibs aged in white oak barrels previously used to age bourbon.", "image_url": "https://res.cloudinary.com/ratebeer/image/upload/w_400,c_limit,d_Default_Beer_qqrv7k.png,f_auto/beer_114747", "price": null, "style": null, "critic_score": {"max": 100, "actual": 100.00000002692344}, "brewer": {"name": "Cigar City Brewing (Monster Beverage Corp)", "city": "Tampa", "country": {"code": "US", "name": "United States"}, "state": {"name": "Florida"}}, "alcohol_bv": 14.600000381469727, "tasting_notes": null, "closure": null, "packaging": null}
    docno: str
    name: str
    description: str
    image_url: str
    price: float
    style: str
    critic_score: CriticScore
    brewer: Brewer
    alcohol_bv: float
    tasting_notes: str
    closure: str
    packaging: str


class Indexer:
    def __init__(self, index_destination_path: str):
        # Initialize the indexer
        self._init_indexer()

        # Save index path
        self.index_destination_path = index_destination_path

    def _init_indexer(self):
        if not pt.started():
            pt.init()

    @staticmethod
    def load_dataset(dataset_path: str) -> List[Document]:
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
        docs: List[Document] = []
        with open(dataset_path, "r") as jsonl_file:
            docs = [
                Document(docno=f"d{idx+1}", **json.loads(line))
                for idx, line in enumerate(jsonl_file)
            ]

        # Convert file into pandas dataframe
        return docs

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

        # Prepare dataset
        def process_json_object(obj, divider=" "):
            def recursive_dict_items(obj):
                for key, value in obj.items():
                    if isinstance(value, dict):
                        yield from recursive_dict_items(value)
                    else:
                        yield key, value

            text = ""
            for _, value in obj.items():
                # Merge all text values, if is dict, unpack
                if isinstance(value, dict):
                    text += process_json_object(value)
                else:
                    text += str(value) + divider
            return text

        # Generate documents list using list comprehension
        docs = [
            IndexDocument(docno=document["docno"], text=process_json_object(document))
            for i, document in enumerate(documents)
        ]
        print(docs[0])

        # Create + start indexer
        indexer = pt.IterDictIndexer(
            self.index_destination_path,
            overwrite=overwrite,
            stemmer=stemmer,
            stopwords=stopwords,
            tokeniser=tokeniser,
            threads=threads,
        )
        index_ref = indexer.index(docs, meta=["docno"])
        # Save value as singlethon
        return index_ref

    @staticmethod
    def retrieve_index(index_ref):
        return pt.IndexFactory.of(index_ref)
