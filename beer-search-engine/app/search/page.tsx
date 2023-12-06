"use client"

import LazyBeerResultLibrary from "@/components/search-results/LazyLoadBeerResultLibrary"
import Loader from "@/components/Loader"
import SearchForm from "@/components/SearchForm"
import { Box } from "@chakra-ui/react"
import { redirect, useRouter } from "next/navigation"
import { Suspense } from "react"

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

  // Return the page
  return (
    <Box>
      <SearchForm
        initialQuery={query}
        onSearch={(newQuery) => {
          // Redirect to new query (shallow)
          push(`/search?q=${newQuery}`, {
            shallow: true,
          })
        }}
      />
      <hr style={{ marginBottom: "40px" }} />
      <Suspense fallback={<Loader />}>
        <LazyBeerResultLibrary query={query} />
      </Suspense>
    </Box>
  )
}
