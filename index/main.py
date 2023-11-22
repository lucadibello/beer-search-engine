from modules import Indexer

# Create the indexer
indexer = Indexer(
    index_destination_path="./beer-index", dataset_path="../data/data.jsonl"
)
documents = indexer.load_dataset()

# Create new index / load one if already built
print("Building index...")
index = indexer.create_index(documents, overwrite=True)

# Print statistics
print(index.getCollectionStatistics().toString())
print("Index built successfully!")
