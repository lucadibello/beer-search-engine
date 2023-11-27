import json
import scrapy


class BeermeSpiderSpider(scrapy.Spider):
    name = "beerme"
    allowed_domains = ["beerme.com"]
    start_urls = ["https://beerme.com/beerlist.php"]
    def start_request(self):
        scrapy.Request(
            url=f"https://beerme.com/beerlist.php", callback=self.parse
        )

    def parse(self, response):
        
        # Assuming the beer details are inside a table with class 'beerlist'
        beer_table = response.xpath('//table[@class="beerlist"]')
        
        # Extracting data from table rows skipping the first row which might be a header
        rows = beer_table.xpath('.//tr[position()>1]')
        
        for row in rows:
            # Extracting data from each column of the row
            beer_details = {
                'name': row.xpath('.//td[1]/text()').get(),
                'description': row.xpath('.//td[2]/text()').get(),
                'location': row.xpath('.//td[3]/text()').get(),
                'critic_score': row.xpath('.//td[5]/text()').get(),
                'date': row.xpath('.//td[6]/text()').get(),
            }
            yield beer_details
