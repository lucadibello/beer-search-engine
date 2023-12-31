"use client"

import LazyBeerResultLibrary from "@/components/search-results/LazyLoadBeerResultLibrary"
import Loader from "@/components/Loader"
import SearchForm from "@/components/SearchForm"
import {
  Box,
  Button,
  HStack,
  Icon,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react"
import { redirect, useRouter } from "next/navigation"
import { Suspense, useEffect } from "react"
import { useBeerRelevanceFeedback } from "@/contexts/BeerRelevanceFeedbackContext"
import { FiRefreshCw } from "react-icons/fi"
import { beerRelevanceFeedback } from "@/service"
import { useBeerLibrary } from "@/contexts/BeerLibraryContext"

// Search page
export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  // Extract query from search params
  const query = searchParams.q

  // If no query, redirect to home
  if (!query) {
    // Redirect to home
    redirect("/")
  }

  // If all data is ready, load router for further navigation
  const { push } = useRouter()

  // Load beer library context
  const { setBeers } = useBeerLibrary()

  // Load relevance feedback context
  const {
    setWeightedQuery,
    weightedQuery,
    relevantBeers,
    irrelevantBeers,
    setIrrelevantBeers,
    setRelevantBeers,
  } = useBeerRelevanceFeedback()

  // Update weighted query on query change
  useEffect(() => {
    setWeightedQuery(query)
  }, [query, setWeightedQuery])

  // Return the page
  return (
    <Box>
      <HStack
        spacing={4}
        mb={4}
        px={4}
        pb={5}
        w="100%"
        position="sticky"
        top="50px"
        zIndex="sticky"
        bg={useColorModeValue("gray.100", "gray.900")}
      >
        {/* Search form */}
        <Box w="100%">
          <SearchForm
            initialQuery={query}
            onSearch={(newQuery) => {
              // Redirect to new query (shallow)
              push(`/search?q=${newQuery}`, {
                shallow: true,
              })
            }}
          />
        </Box>

        {/* Button to rerun query */}
        <Tooltip
          label={
            !irrelevantBeers.length && !relevantBeers.length
              ? "You can adjust the results by marking beers as relevant or irrelevant."
              : "You can rerun the query to get new results."
          }
          hasArrow
        >
          <Button
            variant="outline"
            leftIcon={<Icon as={FiRefreshCw} />}
            onClick={() => {
              // Add query to relevant beers
              beerRelevanceFeedback(
                weightedQuery,
                relevantBeers,
                irrelevantBeers,
              ).then((res) => {
                // Set beers to new results
                setBeers(res.data)
                // Update weighted query
                setWeightedQuery(res.new_query)

                // Scroll to top
                window.scrollTo(0, 0)

                // Reset relevance feedback context
                setRelevantBeers([])
                setIrrelevantBeers([])
              })
            }}
            isDisabled={
              relevantBeers.length === 0 && irrelevantBeers.length === 0
            }
          >
            Adjust results
          </Button>
        </Tooltip>
      </HStack>
      <hr style={{ marginBottom: "40px" }} />
      <Suspense fallback={<Loader />}>
        <LazyBeerResultLibrary query={query} />
      </Suspense>
    </Box>
  )
}
