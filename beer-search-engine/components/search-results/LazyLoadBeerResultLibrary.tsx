"use client"

import { searchBeer } from "@/service"
import { Beer, SearchApiResponse } from "@/service/beer-service"
import { getKeywords } from "@/util/keywords"
import { WrapPromiseResult, wrapPromise } from "@/util/promises"
import { useState, useEffect } from "react"
import BeerResultLibrary from "./BeerResultLibrary"
import { Portal, useDisclosure } from "@chakra-ui/react"
import BeerDetailsModal from "./BeerDetailsModal"
import { useBeerLibrary } from "@/contexts/BeerLibraryContext"

const useBeerSearcher = (query: string) => {
  const [beers, setBeers] =
    useState<WrapPromiseResult<SearchApiResponse> | null>(null)

  useEffect(() => {
    const response = wrapPromise<SearchApiResponse>(searchBeer(query))
    setBeers(response)
  }, [query])

  return beers?.read()
}

export default function LazyBeerResultLibrary({ query }: { query: string }) {
  // Use hook to search for beers
  const apiBeers = useBeerSearcher(query)
  const [selectedBeer, setSelectedBeer] = useState<Beer | null>(null)

  // Load modal context
  const { isOpen, onClose, onOpen } = useDisclosure()

  // Load beer library context
  const { beers, totalHits, setBeers, setTotalHits } = useBeerLibrary()

  // Update beer library based on API response
  useEffect(() => {
    // Update beer library
    setBeers(apiBeers?.data || [])
    setTotalHits(apiBeers?.total_hits || 0)
  }, [apiBeers, setBeers, setTotalHits])

  // Do not show anything until a result is actually available
  if (!beers) {
    return null
  }

  // Return the page
  return (
    <>
      <BeerResultLibrary
        totalHits={totalHits}
        beers={beers || []}
        keywords={getKeywords(query)}
        onBeerSelected={(beer) => {
          setSelectedBeer(beer)
          onOpen()
        }}
      />
      <Portal>
        {selectedBeer && (
          <BeerDetailsModal
            beer={selectedBeer}
            isOpen={isOpen}
            onClose={onClose}
          />
        )}
      </Portal>
    </>
  )
}
