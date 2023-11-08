import scrapy


class BeeradvocateSpiderSpider(scrapy.Spider):
    name = "beeradvocate"
    allowed_domains = ["beeradvocate.com"]
    start_urls = ["https://beeradvocate.com"]

    def parse(self, response):
        pass
