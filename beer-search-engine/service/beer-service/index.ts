import { ApiResponse } from "@/service"

export type Brewer = {
  name: string | null
  city: string | null
  country: {
    code: string | null
    name: string | null
  }
  state: {
    name: string | null
  }
}

export type CriticScore = {
  max: number
  actual: number
}

export interface Beer {
  docno: string
  name: string
  description: string
  image_url: string
  price: null | number
  style: null | string
  critic_score: CriticScore
  brewer: Brewer
  alcohol_bv: number
  tasting_notes: null | string
  closure: null | string
  packaging: null | string
}

export interface SearchApiResponse extends ApiResponse<Beer[]> {
  total_hits: number
}
