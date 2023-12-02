import BeerResult from "@/components/BeerResult"
import Loader from "@/components/Loader"
import { searchBeer } from "@/service"
import { Box, Stack } from "@chakra-ui/react"
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
  const keywords = query.split(' ')

  // Now, fetch the data from the API using the service
  const documents = await searchBeer(query, 100)

  return (
    <Box>
      <h1>Search: {query}</h1>
      <hr style={{ marginBottom: '40px' }} />
      <Suspense fallback={<Loader />}>
        <Stack p={2} spacing={4} align='center'>
          {documents.data.map((document) => <BeerResult key={document.docno} query={keywords} beer={document} />)}
        </Stack>
      </Suspense>
    </Box>
  )
}