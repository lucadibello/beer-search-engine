"use client"

import { Beer } from "@/service/beer-service"
import { Box, HStack, Heading } from "@chakra-ui/react"
import { BeerResultStack } from "./BeerResultStack"
import { useEffect, useState } from "react"
import { BeerSortingTarget, SortOrder, sortBeers } from "@/util/sorter"
import SortingSelect from "./SortingSelect"

type BeerResultLibrary = {
  totalHits?: number
  beers: Beer[]
  keywords?: string | string[]
  onBeerSelected?: (beer: Beer) => void
}

export default function BeerResultLibrary({
  beers,
  keywords,
  totalHits,
  onBeerSelected,
}: BeerResultLibrary) {
  // Save beers in state
  const [localBeers, setLocalBeers] = useState<Beer[]>(beers)

  const [dirtyFilter, setDirtyFilter] = useState<boolean>(false)
  const [sorting, setSorting] = useState<BeerSortingTarget | "relevance">(
    "relevance",
  )
  const [order, setOrder] = useState<SortOrder>("descending")

  useEffect(() => {
    console.log("beers changed", beers)
  }, [beers])

  useEffect(() => {
    // If no filter, do nothing
    if (sorting === "relevance") {
      // Update only if filter is dirty
      if (dirtyFilter) {
        console.log("resetting beers", beers)
        setLocalBeers(beers)
        setDirtyFilter(false)
      }
    } else {
      console.log("sorting", sorting, order, beers)

      // Filter beers
      const filteredBeers = sortBeers(beers, sorting, order)

      // Filter + update local beers
      setLocalBeers(filteredBeers)

      // Set dirty filter to true if it is not already
      if (!dirtyFilter) {
        setDirtyFilter(true)
      }
    }
  }, [beers, sorting, order, dirtyFilter])

  return (
    <Box w="100%" px={5}>
      <HStack mb={5} w="100%" justifyContent="flex-start" alignItems="center">
        <Heading size="md" mb={5}>
          Results: {totalHits}
        </Heading>
        <span style={{ color: "gray" }}> ordered by </span>
        <SortingSelect
          sortingTarget={sorting}
          order={order}
          onSortTargetChange={setSorting}
          onOrderChange={setOrder}
        />
      </HStack>

      <BeerResultStack
        beers={localBeers}
        keywords={keywords}
        onBeerSelected={onBeerSelected}
      />
    </Box>
  )
}
