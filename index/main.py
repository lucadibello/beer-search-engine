from modules import Indexer

# Create the indexer
indexer = Indexer(index_name="beer-index", index_destination_path="index", dataset_path="../data/data.jsonl")

# Create new index / load one if already built
print("Building index")
index = indexer.create_index(overwrite=False)

# Print statistics
print(index.getCollectionStatistics().toString())
print("Done")

