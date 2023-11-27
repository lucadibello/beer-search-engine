from weakref import ref
from modules import Indexer

# Load dataset into memory
documents = Indexer.load_dataset("../data/data.jsonl")

# Create new index / load one if already built
print("Building index...")
ref = Indexer(index_destination_path="./.beer-index").create_index(
    documents,
    overwrite=True,
    stemmer="porter",
    stopwords="terrier",
    tokeniser="english",
    threads=1,
)
print("Index built! Ref: ", ref.toString())

# Print statistics
print("Index statistics:")
print(Indexer.retrieve_index(ref).getCollectionStatistics().toString())
print("Index built successfully!")
