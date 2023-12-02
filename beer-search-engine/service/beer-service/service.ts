import { SearchApiResponse } from "@/service/beer-service/types"

export async function preloadSearch(query: string): Promise<void> {
  void searchBeer(query)
}

export async function searchBeer(query: string, limit: number = 10): Promise<SearchApiResponse> {
  if (process.env.NEXT_PUBLIC_API_URL === undefined) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined")
  }
  const URL = process.env.NEXT_PUBLIC_API_URL + "/search?query=" + query + "&top=" + limit
  const res = await fetch(URL, {
    cache: "no-store"
  })

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