"use client"

import LazyBeerResultLibrary from "@/components/search-results/LazyLoadBeerResultLibrary"
import Loader from "@/components/Loader"
import SearchForm from "@/components/SearchForm"
import { Box, Button, HStack, useColorModeValue } from "@chakra-ui/react"
import { redirect, useRouter } from "next/navigation"
import { Suspense, useEffect } from "react"
import { useBeerRelevanceFeedback } from "@/contexts/BeerRelevanceFeedbackContext"

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

  // Load relevance feedback context
  const { relevantBeers, irrelevantBeers } = useBeerRelevanceFeedback()

  useEffect(() => {
    // Preload search API
    console.log(relevantBeers, irrelevantBeers)
  }, [relevantBeers, irrelevantBeers])

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
        {relevantBeers.length > 0 ||
          (irrelevantBeers.length > 0 && (
            <Button
              onClick={() => {
                // Add query to relevant beers
                console.log("Adjusting results")
              }}
            >
              Adjust results
            </Button>
          ))}
      </HStack>
      <hr style={{ marginBottom: "40px" }} />
      <Suspense fallback={<Loader />}>
        <LazyBeerResultLibrary query={query} />
      </Suspense>
    </Box>
  )
}
