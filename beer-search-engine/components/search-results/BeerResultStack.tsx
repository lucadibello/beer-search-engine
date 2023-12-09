"use client"
import { Box, Stack } from "@chakra-ui/react"
import BeerResultSnippet from "./snippet/BeerResultSnippet"
import { Beer } from "@/service/beer-service"
import { useBeerRelevanceFeedback } from "@/contexts/BeerRelevanceFeedbackContext"

type BeerResultStackProps = {
  totalHits?: number
  beers: Beer[]
  keywords?: string | string[]
  onBeerSelected?: (_beer: Beer) => void
  enableRichResults?: boolean
  emptyComponent?: JSX.Element
}

export function BeerResultStack({
  beers,
  keywords,
  onBeerSelected,
  emptyComponent,
}: BeerResultStackProps) {
  // Load beer relevance feedback context
  const {
    addRelevantBeer,
    addIrrelevantBeer,
    removeRelevantBeer,
    removeIrrelevantBeer,
    isBeerIrrelevant,
    isBeerRelevant,
  } = useBeerRelevanceFeedback()

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
            onRelevant={(beer) => {
              // If already relevant, remove
              if (isBeerRelevant(beer)) {
                removeRelevantBeer(beer)
              } else {
                addRelevantBeer(beer)
              }
            }}
            onIrrelevant={(beer) => {
              // If already irrelevant, remove
              if (isBeerIrrelevant(beer)) {
                removeIrrelevantBeer(beer)
              } else {
                addIrrelevantBeer(beer)
              }
            }}
          />
        </Box>
      ))}
    </Stack>
  )
}
