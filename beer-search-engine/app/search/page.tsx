import BeerResult from "@/components/BeerResult"
import { searchBeer } from "@/service/beer-service"
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

  // Now, fetch the data from the API using the service
  const documents = await searchBeer(query, 100)

  // console.log('Documents: ', documents)

  return (
    <Box>
      <h1>Search: {query}</h1>
      <hr style={{ marginBottom: '40px' }} />
      <Suspense fallback={<p>Loading...</p>}>
        {documents.map((document) => <BeerResult key={document.docno} beer={document} />)}
      </Suspense>
    </Box>
  )
}