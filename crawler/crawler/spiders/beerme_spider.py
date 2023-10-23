import scrapy


class BeermeSpiderSpider(scrapy.Spider):
    name = "beerme-spider"
    allowed_domains = ["beerme.com"]
    start_urls = ["https://beerme.com"]

    def parse(self, response):
        pass
