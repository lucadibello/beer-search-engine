import scrapy


class RatebeerSpiderSpider(scrapy.Spider):
    name = "ratebeer-spider"
    allowed_domains = ["ratebeer.com"]
    start_urls = ["https://ratebeer.com"]

    def parse(self, response):
        pass
