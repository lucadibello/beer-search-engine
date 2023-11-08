# Launch scrapy spider
crawl:
	scrapy crawl --nolog -o data.json -t json

crawl_winevybe:
	scrapy runspider crawler/spiders/winevybe.py -O data/data.jsonl:jsonlines

# Export dependencies
exportenv:
	conda env export --no-builds > environment.yml