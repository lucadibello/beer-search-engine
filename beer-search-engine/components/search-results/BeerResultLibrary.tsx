"use client"

import { Beer } from "@/service/beer-service"
import { Box, Heading, Stack, Text } from "@chakra-ui/react"
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

  // Sorting
  const [dirtySorting, setDirtySorting] = useState<boolean>(false)
  const [sorting, setSorting] = useState<BeerSortingTarget | "relevance">(
    "relevance",
  )
  const [order, setOrder] = useState<SortOrder>("descending")

  useEffect(() => {
    // If no filter, do nothing
    if (sorting === "relevance") {
      // Update only if filter is dirty
      if (dirtySorting) {
        setLocalBeers(beers)
        setDirtySorting(false)
      }
    } else {
      // Filter beers
      const filteredBeers = sortBeers(beers, sorting, order)

      // Filter + update local beers
      setLocalBeers(filteredBeers)

      // Set dirty filter to true if it is not already
      if (!dirtySorting) {
        setDirtySorting(true)
      }
    }
  }, [beers, sorting, order, dirtySorting])

  return (
    <Box w="100%" px={5}>
      <Box mb={5}>
        <Stack
          w="100%"
          alignItems={{ base: "flex-start", md: "center" }}
          flexDir={{ base: "column", md: "row" }}
          // All aligned to the left
          justifyContent="flex-start"
          spacing={5}
        >
          <Heading size="md">Results</Heading>
          <Text fontSize={"xl"} style={{ color: "gray" }}>
            ordered by
          </Text>
          <SortingSelect
            sortingTarget={sorting}
            order={order}
            onSortTargetChange={setSorting}
            onOrderChange={setOrder}
          />
        </Stack>

        {/* Show total hits if available */}
        {totalHits && (
          <Text mb={5} style={{ color: "gray" }}>
            {totalHits} results
          </Text>
        )}
      </Box>

      <BeerResultStack
        beers={localBeers}
        keywords={keywords}
        onBeerSelected={onBeerSelected}
      />
    </Box>
  )
}
