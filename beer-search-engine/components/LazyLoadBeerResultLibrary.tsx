'use client';

import { searchBeer } from "@/service"
import { SearchApiResponse } from "@/service/beer-service"
import { getKeywords } from "@/util/keywords"
import { WrapPromiseResult, wrapPromise } from "@/util/promises"
import { useState, useEffect } from "react"
import BeerResultLibrary from "./BeerResultLibrary"

const useBeerSearcher = (query: string) => {
  const [beers, setBeers] = useState<WrapPromiseResult<SearchApiResponse> | null>(null)

  useEffect(() => {
    const response = wrapPromise<SearchApiResponse>(searchBeer(query))
    setBeers(response)
  }, [query])

  return beers?.read()
}

export default function LazyBeerResultLibrary({
  query,
}: {
  query: string
}) {
  // Use hook to search for beers
  const beers = useBeerSearcher(query);

  // Return the page
  return (
    <BeerResultLibrary
      totalHits={beers?.total_hits || 0}
      beers={beers?.data || []}
      enableRichResults={true}
      keywords={getKeywords(query)}
    />
  )
}