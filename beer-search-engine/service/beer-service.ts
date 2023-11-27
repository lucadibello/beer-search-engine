export interface Beer {
  docno: string
  name: string
  description: string
  image_url: string
  price: null | number
  style: null | string
  critic_score: {
    max: number
    actual: number
  }
  brewer: {
    name: string
    city: string

    country: {
      code: string
      name: string
    }
    state: {
      name: string
    }
  }
  alcohol_bv: number
  tasting_notes: null | string
  closure: null | string
  packaging: null | string
}

export async function searchBeer(query: string, limit: number = 100): Promise<Beer[]> {
  if (process.env.API_URL === undefined) {
    throw new Error("API_URL is not defined")
  }
  const res = await fetch(process.env.API_URL + "/search?query=" + query + "&top=" + limit)


  // Check if the request was successful
  if (!res.ok) {
    throw new Error("Search request failed")
  }

  // Return the result
  return res.json()
}