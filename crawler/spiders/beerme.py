import scrapy
from scrapy_splash import SplashRequest


class BeermeSpiderSpider(scrapy.Spider):
    name = 'beerme'
    allowed_domains = ['beerme.com']
    start_urls = ['https://beerme.com/beerlist.php']
    beer_list_urls = []

    def start_request(self):
        for url in self.start_urls:
            yield scrapy.Request(url, callback=self.parse)

    def parse(self, response):
        # Extracting the total count of breweries to be able to crawl per each brewery page
        breweries_count_comp = response.xpath('//div[@id="blurb"]/div/text()[4]').get()
        breweries_count_comp = breweries_count_comp.split(' breweries')[0].split()
        breweries_count_comp = breweries_count_comp[len(breweries_count_comp)-1].split(',')
        breweries_count_comp = breweries_count_comp[0]+breweries_count_comp[1]
        breweries_count = int(breweries_count_comp)
        
        for i in range(breweries_count):
            url = f'https://beerme.com/brewery.php?{i}'
            # Usage of SplashRequest to allow for dynamically content to be loaded before crawling it
            yield SplashRequest(url, callback=self.parse_beers, args={'wait': 20})
            
    def parse_beers(self, response):
        
        beer_list = response.xpath('//div[@id="beersDiv"]/ul')
        
        # Extracting data from ul element
        rows = beer_list.xpath('.//li[position()>0]')

        for row in rows:
            name = row.xpath('.//div[@class="beerName"]/a/text()').get()

            critic_score = row.xpath('.//div[contains(text(), " points")]/text()').get()

            # retrieve the number out of the string containing the point description: [+] Tasting Notes (19½ points)
            critic_score = float(critic_score.split()[0].replace('½', '.5')) if critic_score else critic_score

            alcohol_bv = row.xpath('.//div[contains(text(), " abv.")]/text()').get()
            alcohol_bv = float(alcohol_bv.split('%')[0]) if alcohol_bv else None
            
            image_url = row.xpath(".//a/img/@src").get()
            image_url = f'https://beerme.com/{image_url}' if image_url else None

            # Extracting data from each column of the row
            beer_details = {
                'name': name,
                'description': row.xpath('.//div[2]/a/text()').get(),
                'alcohol_bv': alcohol_bv,
                'critic_score': {'max': 20, 'actual': critic_score},
                'image_url': image_url,
                'brewer': {
                    'name': None,
                    'city': None,
                    'country': None,
                    'state': None
                },
                'price': None,
                'style': None,
                'tasting_notes': None,
                'closure': None,
                'packaging': None
            }
            if name != None:
                yield beer_details
