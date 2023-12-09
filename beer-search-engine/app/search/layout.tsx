import BeerLibraryProvider from "@/contexts/BeerLibraryContext"
import BeerRelevanceFeedbackProvider from "@/contexts/BeerRelevanceFeedbackContext"

interface SearchLayoutProps {
  children: JSX.Element
}

// FIXME: We need to find a better description...
export const metadata = {
  title: "Beer Search Engine - Search",
  description:
    "Search for beers related to your query and provide feedback to improve the search results.",
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <BeerLibraryProvider>
      <BeerRelevanceFeedbackProvider>{children}</BeerRelevanceFeedbackProvider>
    </BeerLibraryProvider>
  )
}
