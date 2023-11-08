# Launch scrapy spider
crawl:
	scrapy crawl --nolog -o data.json -t json

# Export dependencies
exportenv:
	conda env export --no-builds > environment.yml