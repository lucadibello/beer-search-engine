"use client"
import { Box, Stack } from "@chakra-ui/react"
import BeerResultSnippet from "./snippet/BeerResultSnippet"
import { Beer } from "@/service/beer-service"

type BeerResultStackProps = {
  totalHits?: number
  beers: Beer[]
  keywords?: string | string[]
  onBeerSelected?: (beer: Beer) => void
  enableRichResults?: boolean
  emptyComponent?: JSX.Element
}

export function BeerResultStack({
  beers,
  keywords,
  onBeerSelected,
  emptyComponent,
}: BeerResultStackProps) {
  if (beers.length === 0) {
    return emptyComponent || null
  }

  return (
    <Stack spacing={4} direction="column" align="flex-start" justify="left">
      {beers.map((beer) => (
        <Box key={beer.docno} w="100%">
          <BeerResultSnippet
            keywords={keywords || []}
            beer={beer}
            onClick={onBeerSelected}
          />
        </Box>
      ))}
    </Stack>
  )
}
