import { ApiResponse } from "@/service"

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

export interface SearchApiResponse extends ApiResponse<Beer[]> {
  total_hits: number
}
