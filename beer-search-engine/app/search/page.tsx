import BeerResultLibrary from "@/components/BeerResultLibrary"
import Loader from "@/components/Loader"
import { searchBeer } from "@/service"
import { getKeywords } from "@/util/keywords"
import { Box } from "@chakra-ui/react"
import { redirect } from "next/navigation"
import { Suspense } from "react"

// Search page
export default async function Search({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  // Extract query from search params
  const query = searchParams.q

  // If no query, redirect to home
  if (!query) {
    // Redirect to home
    redirect('/')
  }

  // Split query by space
  const keywords = getKeywords(query)

  // Now, fetch the data from the API using the service
  const documents = await searchBeer(query, 100)

  // Return the page
  return (
    <Box>
      <h1>Search: {query}</h1>
      <hr style={{ marginBottom: '40px' }} />
      <Suspense fallback={<Loader />}>
        <BeerResultLibrary
          totalHits={documents.total_hits}
          beers={documents.data}
          keywords={keywords}
          enableRichResults={true}
        />
      </Suspense>
    </Box>
  )
}