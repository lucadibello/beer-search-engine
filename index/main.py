from weakref import ref
from modules import Indexer

# Create the indexer
indexer = Indexer(
    index_destination_path="./beer-index", dataset_path="../data/data.jsonl"
)
documents = indexer.load_dataset()

# Create new index / load one if already built
print("Building index...")
ref = indexer.create_index(
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
