# Launch scrapy spider for each website
crawl_all:
	scrapy list|xargs -n 1 scrapy crawl -o data/data.jsonl:jsonlines

# Launch scrapy spider for winevybe.com
crawl_winevybe:
	scrapy runspider crawler/spiders/winevybe.py -o data/data.jsonl:jsonlines

# Launch scrapy spider for ratebeer.com
crawl_ratebeer:
	scrapy runspider crawler/spiders/ratebeer.py -o data/data.jsonl:jsonlines

# Export dependencies
exportenv:
	conda env export --no-builds > environment.yml