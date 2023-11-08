import scrapy


class BeermeSpiderSpider(scrapy.Spider):
    name = "beerme"
    allowed_domains = ["beerme.com"]
    start_urls = ["https://beerme.com"]

    def parse(self, response):
        pass
