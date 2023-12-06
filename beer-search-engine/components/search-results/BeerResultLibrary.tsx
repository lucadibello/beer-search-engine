"use client"

import { Beer } from "@/service/beer-service"
import { Box, Heading } from "@chakra-ui/react"
import { useState } from "react"
import { BeerResultStack } from "./BeerResultStack"

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
  const [beer, setBeer] = useState<Beer | null>(null)

  return (
    <Box
      w="100%"
      // Occupy 70% of the flex container
      flex={beer ? { base: "0 0 100%", md: "0 0 65%" } : {}}
      px={5}
    >
      <Heading size="md" mb={5}>
        Results:
        {totalHits && (
          <span style={{ marginLeft: "10px" }}>{totalHits} results</span>
        )}
        <span style={{ color: "gray" }}> ordered by relevance</span>
      </Heading>
      <BeerResultStack
        beers={beers}
        keywords={keywords}
        onBeerSelected={onBeerSelected}
      />
    </Box>
  )
}
