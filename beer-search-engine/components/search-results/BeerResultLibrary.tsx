"use client"

import { Beer } from "@/service/beer-service"
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react"
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

  // Update local beers when beers change
  useEffect(() => {
    setLocalBeers(beers)
  }, [beers])

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
          <Text fontSize={"xl"}>ordered by</Text>
          <SortingSelect
            sortingTarget={sorting}
            order={order}
            onSortTargetChange={setSorting}
            onOrderChange={setOrder}
            isDisabled={localBeers.length === 0}
          />
        </Stack>

        {/* Show total hits if available */}
        {totalHits ? (
          <Text mb={5} style={{ color: "gray" }}>
            {totalHits} documents found
          </Text>
        ) : (
          <Text mb={5} style={{ color: "gray" }}>
            No documents found
          </Text>
        )}
      </Box>

      <BeerResultStack
        beers={localBeers}
        keywords={keywords}
        onBeerSelected={onBeerSelected}
        emptyComponent={
          <Flex w="100%" justifyContent="center" h="60vh" alignItems="center">
            <Alert
              status="error"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="200px"
              w="80%"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Oh no! We couldn&apos;t find any beers for you.
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                You could try to search for something else.
              </AlertDescription>
            </Alert>
          </Flex>
        }
      />
    </Box>
  )
}
