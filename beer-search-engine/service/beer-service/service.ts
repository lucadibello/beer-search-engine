import {
  Beer,
  RelevanceFeedbackApiResponse,
  SearchApiResponse,
} from "@/service/beer-service"

export async function preloadSearch(query: string): Promise<void> {
  void searchBeer(query)
}

export async function searchBeer(
  query: string,
  limit: number = 10,
): Promise<SearchApiResponse> {
  if (process.env.NEXT_PUBLIC_API_URL === undefined) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined")
  }
  const URL =
    process.env.NEXT_PUBLIC_API_URL + "/search?query=" + query + "&top=" + limit
  const res = await fetch(URL)

  // Check if the request was successful
  if (!res.ok) {
    throw new Error("Search request failed")
  }

  // Check if the response is valid JSON
  if (!res.headers.get("content-type")?.startsWith("application/json")) {
    throw new Error("Search response is not JSON")
  }

  return res.json()
}

export async function beerRelevanceFeedback(
  query: string,
  relevantBeers: Beer[],
  irrelevantBeers: Beer[],
): Promise<RelevanceFeedbackApiResponse> {
  if (process.env.NEXT_PUBLIC_API_URL === undefined) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined")
  }
  const URL = process.env.NEXT_PUBLIC_API_URL + "/feedback"
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
      relevant: relevantBeers.map((beer) => beer.docno),
      irrelevant: irrelevantBeers.map((beer) => beer.docno),
    }),
  })

  // Check if the request was successful
  if (!res.ok) {
    throw new Error("Feedback request failed")
  }

  // Check if the response is valid JSON
  if (!res.headers.get("content-type")?.startsWith("application/json")) {
    throw new Error("Feedback response is not JSON")
  }

  return res.json()
}
