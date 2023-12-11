import json
import re
import scrapy


class RatebeerSpiderSpider(scrapy.Spider):
    name = "ratebeer"
    allowed_domains = ["ratebeer.com"]
    start_urls = ["https://ratebeer.com"]

    # Disable robots.txt
    # NOTE: we are not scraping the website, but gathering data from the APIs used by all users that visit the website! This information is public.
    custom_settings = {
        "ROBOTSTXT_OBEY": False,
    }

    # Additional scraping settings
    _scraping_step = 500

    # Static parameters
    _additional_fields = {"tasting_notes": None, "closure": None}
    _query = """
    query SearchResultsBeer($includePurchaseOptions: Boolean!, $latlng: [Float!]!, $query: String, $order: SearchOrder, $first: Int, $after: ID) {
            results: beerSearch(query: $query, order: $order, first: $first, after: $after) {
                totalCount
                last
                items {
                beer {
                    id
                    name
                    description
                    style {
                        name
                    }
                    brewer {
                        name
                        city
                        country {
                            code
                            name
                        }
                        state {
                            name
                        }
                    }
                    availability {
                        bottle
                        tap
                    }
                    overallScore
                    abv
                    imageUrl
                    purchaseOptions(options: {latlng: $latlng}) @include(if: $includePurchaseOptions) {
                        items {
                            currencySymbol
                            priceValue
                        }
                    }
                }
            }
        }
    }
    """

    # Variable trick to gather all possible beers in the database of RateBeer
    _variables = {
        "query": " A B",
        "order": "OVERALL_SCORE",
        "includePurchaseOptions": True,
        "latlng": [0, 0],
        # Leveraging GraphQL pagination to gather all possible beers in multiple requests!
        "after": 0,
        "first": _scraping_step,
    }

    def start_requests(self):
        # Send request to APIs endpoint
        print("")
        print("Sending request for first beers...")
        print("")
        yield scrapy.Request(
            url="https://beta.ratebeer.com/v1/api/graphql/",
            method="POST",
            body=json.dumps({"query": self._query, "variables": self._variables}),
            # Add content type header
            headers={"Content-Type": "application/json"},
            callback=self.parse,
            # On error, print response
            errback=lambda failure: print(
                "error message: ", failure.value.response.text
            ),
        )

    def parse(self, response):
        # Update after variable for next requests!
        self._variables["after"] += self._scraping_step

        # Parse JSON response
        json_response = json.loads(response.body)

        # Ensure that we have received a valid response
        if "errors" in json_response:
            print("")
            print("--- Errors in API response ---")
            print(json_response["errors"])
            print(
                f"Requested window: {self._variables['after']} - {self._variables['after'] + self._scraping_step}"
            )
            print("--- End of errors ---")
            print("")
            print(f"Aborting scraping.. Seemd the server has some issues!")
            return

        # Extract beers
        beers = json_response["data"]["results"]["items"]

        # Analyse each beer
        for beer in beers:
            # Parse and return beer data
            yield self.parse_beer_data(beer)

        # Extract how many beers there are in total
        total_beers = int(json_response["data"]["results"]["totalCount"])

        # Extract how many beers we have received
        received_beers = int(json_response["data"]["results"]["last"])

        # Notify status
        print("")
        print(f"Received {received_beers} beers out of {total_beers} beers")
        print("")

        # While we have not received all beers
        if received_beers < total_beers:
            print(
                f"Sending request for next beer window: {self._variables['after']} - {self._variables['after'] + self._scraping_step}"
            )
            print("")

            # Send request for next beers + recursively call parse
            yield scrapy.Request(
                url="https://beta.ratebeer.com/v1/api/graphql/",
                method="POST",
                body=json.dumps({"query": self._query, "variables": self._variables}),
                # Add content type header
                headers={"Content-Type": "application/json"},
                callback=self.parse,
                # On error, print response
                errback=lambda failure: print(
                    "error message: ", failure.value.response.text
                ),
            )

    def parse_beer_data(self, beer_json: dict):
        name = beer_json["beer"]["name"]
        description = (
            self.sanitize_description(beer_json["beer"]["description"])
            if beer_json["beer"]["description"] is not None
            else None
        )
        image_url = beer_json["beer"]["imageUrl"]
        price = (
            {
                "value": beer_json["beer"]["purchaseOptions"]["items"][0]["priceValue"],
                "currency": beer_json["beer"]["purchaseOptions"]["items"][0][
                    "currencySymbol"
                ],
            }
            if beer_json["beer"]["purchaseOptions"]["items"] != []
            else None
        )
        critic_score = beer_json["beer"]["overallScore"]

        # Extract brewer (a bit more complex filter since the APIs are badly designed)
        brewer_exists = (
            beer_json["beer"]["brewer"] != None and len(beer_json["beer"]["brewer"]) > 0
        )
        if isinstance(beer_json["beer"]["brewer"], list):
            brewer = beer_json["beer"]["brewer"][0] if brewer_exists else None
        else:
            brewer = beer_json["beer"]["brewer"] if brewer_exists else None

        packaging = (
            self.parse_packaging(beer_json["beer"]["availability"])
            if beer_json["beer"]["availability"] != []
            else None
        )
        alcolhol_bv = (
            float(beer_json["beer"]["abv"]) if beer_json["beer"]["abv"] else None
        )

        # Extract beer data
        return {
            "name": name,
            "description": description,
            "image_url": image_url,
            "price": price,
            "style": None,
            "critic_score": {
                "max": 100,
                "actual": critic_score,
            }
            if critic_score is not None
            else None,
            "brewer": brewer,
            "alcohol_bv": alcolhol_bv,
            **self._additional_fields,  # Additional fields (keep same order as in other scrapers!)
            "packaging": packaging,
        }

    def parse_packaging(self, availability) -> str:
        """
        EXAMPLE RESPONSE:
        "availability": {
            "bottle": "unknown",
            "tap": "unknown"
        },
        """

        # If bottle and tap are unknown, return None
        if availability["bottle"] == "unknown" and availability["tap"] == "unknown":
            return None # type: ignore (Python 3.8 does not support multiple return types)
        elif availability["bottle"] != "unknown" and availability["tap"] == "unknown":
            return "bottle"
        elif availability["bottle"] == "unknown" and availability["tap"] != "unknown":
            return "tap"
        else:
            return "bottle and tap"

    def sanitize_description(self, description: str) -> str:
        # Join + sanitize description (not the best way to do it, but we have to use the same format as before!)
        description = (
            description.replace("\n", " ").replace("\t", " ").replace("\r", " ")
        )
        # Remove multiple spaces
        description = re.sub(r"\s+", " ", description)
        # Add spaces after dots
        description = re.sub(r"\.(?! )", ". ", description).strip()

        # Return description
        return description
