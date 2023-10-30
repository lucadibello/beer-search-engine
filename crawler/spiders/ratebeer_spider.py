import json
import scrapy


class RatebeerSpiderSpider(scrapy.Spider):
    name = "ratebeer-spider"
    allowed_domains = ["ratebeer.com"]
    start_urls = ["https://ratebeer.com"]

    def parse(self, response):
        # Perform GraphQL query
        query = """
        query SearchResultsBeer($includePurchaseOptions: Boolean!, $latlng: [Float!]!, $query: String, $order: SearchOrder, $first: Int, $after: ID) {
            results: beerSearch(query: $query, order: $order, first: $first, after: $after) {
                totalCount
                last
                items {
                review {
                    id
                    score
                    likedByMe
                    updatedAt
                    createdAt
                    __typename
                }
                beer {
                    id
                    name
                    style {
                    id
                    name
                    __typename
                    }
                    overallScore
                    styleScore
                    averageQuickRating
                    abv
                    ibu
                    brewer {
                    id
                    name
                    country {
                        id
                        code
                        __typename
                    }
                    __typename
                    }
                    contractBrewer {
                    id
                    name
                    country {
                        id
                        code
                        __typename
                    }
                    __typename
                    }
                    ratingsCount
                    imageUrl
                    isRetired
                    isAlias
                    purchaseOptions(options: {latlng: $latlng}) @include(if: $includePurchaseOptions) {
                    items {
                        productId
                        price
                        currency
                        currencySymbol
                        priceValue
                        store {
                        id
                        __typename
                        }
                        __typename
                    }
                    __typename
                    }
                    __typename
                }
                __typename
                }
                __typename
            }
        }
        """

        variables = {
            "query": " A B",
            "order": "OVERALL_SCORE",
            "includePurchaseOptions": False,
            "latlng": [0, 0],
            "first": 10,
        }

        # Send request
        yield scrapy.Request(
            url="https://beta.ratebeer.com/v1/api/graphql/",
            method="POST",
            body=json.dumps({"query": query, "variables": variables}),
            callback=self.parse_beer_search
        )

    def parse_beer_search(self, response):
        print(response.body)
