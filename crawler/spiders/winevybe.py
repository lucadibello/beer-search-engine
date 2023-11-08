import re
import scrapy


class WinevybeSpider(scrapy.Spider):
    name = "winevybe"
    allowed_domains = ["winevybe.com"]

    # Additional fields to comform to the same format as before:
    _additional_fields = {
        "style": None,
    }

    def start_requests(self):
        # Scrape all pages!
        for index in range(100):
            yield scrapy.Request(
                url=f"https://winevybe.com/beer/page/{index}/", callback=self.parse
            )

    def parse(self, response):
        # Check if all pages have been scraped (404 page)
        if response.status == 404:
            # Return
            return

        # Print response
        products = response.css("li.product.type-product")

        # Analyse each product
        for product in products:
            # Extract product URL
            product_url = product.css("a::attr(href)").get()

            # Send request
            yield scrapy.Request(url=product_url, callback=self.parse_product)

    def parse_product(self, response: scrapy.Selector):
        # Extract brand and name
        _, name = self.parse_product_brand_name(response)

        # Extract product image URL
        image_url = response.css(
            ".woocommerce-product-gallery__image > img::attr(src)"
        ).get()

        # Extract product price
        price, currency = self.parse_product_price(response)

        ## NOW, SCRAPING THE TABLE
        possible_headers = {
            "Critic Score": "critic_score",
            "Producer": "brewer",
            "Alcohol bv": "alcohol_bv",
            "Tasting Notes": "tasting_notes",
            "Closure": "closure",
            "Packaging": "packaging",
        }

        # Initialize table_data with all possible headers set to None
        table_data = {header: None for header in possible_headers.values()}

        # Identify table rows
        rows = response.css(".around")

        # Extract data from column
        for row in rows:
            property_name, value = self.parse_table_rows(row)

            # Ensure that data has been found and is a known header
            if property_name in possible_headers:
                # If name is Critic Score and value is not None, extract max and actual score
                if property_name == "Critic Score" and value is not None:
                    parts = value.split("/")
                    actual_critics_score = int(parts[0])
                    max_critics_score = int(parts[1])

                    # Update dictionary for critic_score with a sub-dictionary
                    table_data[possible_headers[property_name]] = {  # type: ignore
                        "max": max_critics_score,
                        "actual": actual_critics_score,
                    }
                elif property_name == "Alcohol bv" and value is not None:
                    # Update dictionary for critic_score with a sub-dictionary
                    table_data[possible_headers[property_name]] = float(value.replace("%", ""))  # type: ignore
                elif property_name == "Producer" and value is not None:
                    # Update dictionary for critic_score with a sub-dictionary
                    table_data[possible_headers[property_name]] = {  # type: ignore
                        "name": value,
                        "country": None,
                        "state": None,
                        "city": None,
                    }
                else:
                    # Update the value for this header in table_data
                    table_data[possible_headers[property_name]] = value  # type: ignore

        # Return product
        yield {
            "name": name,
            "description": self.parse_product_description(response),
            "image_url": image_url,
            "price": {
                "amount": price,
                "currency": currency,
            },
            **self._additional_fields,  # Spread additional fields
            **table_data,  # Spread dictionary containing row data
        }

    def parse_table_rows(self, row: scrapy.Selector) -> tuple[str | None, str | None]:
        # .wineleft = Name
        # .wineright = Actual value
        data_name = row.css(".wineleft::text").get()
        data_value = row.css(".wineright::text").get()
        return (data_name, data_value)

    def parse_product_brand_name(
        self, response: scrapy.Selector
    ) -> tuple[str | None, str]:
        # Extract brand name
        brand = response.css(".brand::text").get()
        name = "".join(response.css(".product::text").getall()).strip()

        # If brand has been found, strip it
        if brand:
            brand = brand.strip()

        # Check if name is empty
        if not name:
            # Get name from breadcrumb
            tmpname = (
                response.css(".woocommerce-breadcrumb span::text").getall()[-1].strip()
            )
            # If name contains brand name, remove it
            if brand and brand in tmpname:
                name = tmpname.replace(brand, "").strip()
            else:
                name = tmpname
        else:
            # Strip name
            name = name.strip()

        return (brand, name)

    def parse_product_description(self, response: scrapy.Selector) -> str:
        # Extract description
        description_pieces = response.css(".short-description > p").getall()

        # NOTE: Workaround to extract text content from pieces
        description_content = []
        for piece in description_pieces:
            # Extract text content from piece
            piece_content = scrapy.Selector(text=piece).css("::text").getall()
            # Append
            description_content.append("".join(piece_content))

        # Join + sanitize description
        description = (
            "".join(description_content)
            .replace("\n", " ")
            .replace("\t", " ")
            .replace("\r", " ")
        )

        # Remove multiple spaces
        description = re.sub(r"\s+", " ", description)

        # Add spaces after dots
        description = re.sub(r"\.(?! )", ". ", description).strip()

        # Return description
        return description

    def parse_product_price(
        self, response: scrapy.Selector
    ) -> tuple[float | None, str | None]:
        # Extract price
        price = response.css(".woocommerce-Price-amount > bdi::text").get()

        # Extract currency
        currency = response.css(".woocommerce-Price-currencySymbol::text").get()

        # Return tuple
        return (float(price) if price is not None else None, currency)
