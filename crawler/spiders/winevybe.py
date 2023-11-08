import re
import scrapy


class WinevybeSpider(scrapy.Spider):
    name = "winevybe"
    allowed_domains = ["winevybe.com"]

    def start_requests(self):
        for i in range(1):
            yield scrapy.Request(
                url=f"https://winevybe.com/beer/page/{i}/", callback=self.parse
            )

    def parse(self, response):
        # Print response
        products = response.css("li.product.type-product")

        # Analyse each product
        for product in products:
            # Extract product URL
            product_url = product.css("a::attr(href)").get()

            # Send request
            yield scrapy.Request(url=product_url, callback=self.parse_product)

    def parse_product(self, response):
        # Extract brand name
        brand = (
            response.xpath('//*[@id="ajax-content-wrap"]/div[1]/h1/span/text()')
            .get()
            .strip()
        )
        name = (
            response.css("#ajax-content-wrap > div:nth-child(1) > h1::text")
            .getall()[1]
            .strip()
        )

        # Check if name is empty
        if not name:
            # Get name from breadcrumb
            tmpname = (
                response.css(".woocommerce-breadcrumb span::text").getall()[-1].strip()
            )

            # If name contains brand name, remove it
            if brand in tmpname:
                name = tmpname.replace(brand, "").strip()
            else:
                name = tmpname

        # Extract description
        description_content: list[str] = [
            p.strip()
            for p in response.xpath(
                '//*[starts-with(@id, "product-")]/div[1]/div[1]/div[2]/p[2]/text()'
            ).getall()
        ]
        missing_pieces: list[str] = [
            p.strip()
            for p in response.xpath(
                '//*[starts-with(@id, "product-")]/div[1]/div[1]/div[2]/p[2]/*/text()'
            ).getall()
        ]

        # After each description element, add a missing piece
        for i in range(len(missing_pieces)):
            description_content.insert(i * 2 + 1, missing_pieces[i])

        # Join + sanitize description
        description = (
            "".join(description_content)
            .replace("\n", "")
            .replace("\t", "")
            .replace("\r", "")
        )
        # Add spaces after dots
        description = re.sub(r"\.(?! )", ". ", description)

        ## NOW, SCRAPING THE TABLE
        possible_headers = [
            "Critic Score",
            "Producer",
            "Type",
            "Alcohol bv",
            "Tasting Notes",
            "Closure",
            "Packaging",
            "MPN #",
        ]

        # For each row of the table, check the header

        # Extract critic score
        tmp_critic_score = (
            response.xpath(
                '//*[starts-with(@id, "product-")]/div[1]/div[1]/div[3]/div[1]/span[3]/text()'
            )
            .get()
            .strip()
            .split("/")
        )
        max_critics_score = int(tmp_critic_score[1])
        actual_critics_score = int(tmp_critic_score[0])

        # Extract closure type
        closure_type = response.xpath(
            '//*[starts-with(@id, "product-")]/div[1]/div[1]/div[3]/div[3]/span[3]/text()'
        ).get()

        # Extract MPN
        mpn = response.xpath(
            '//*[starts-with(@id, "product-")]/div[1]/div[1]/div[3]/div[4]/span[3]/text()'
        ).get()

        # Return product
        yield {
            "brand": brand,
            "name": name,
            "description": description,
            "critic_score": {"max": max_critics_score, "actual": actual_critics_score},
            "closure_type": closure_type,
            "mpn": mpn,
        }
