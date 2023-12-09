import BeerLibraryProvider from "@/contexts/BeerLibraryContext"
import BeerRelevanceFeedbackProvider from "@/contexts/BeerRelevanceFeedbackContext"

interface SearchLayoutProps {
  children: JSX.Element
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <BeerLibraryProvider>
      <BeerRelevanceFeedbackProvider>{children}</BeerRelevanceFeedbackProvider>
    </BeerLibraryProvider>
  )
}
