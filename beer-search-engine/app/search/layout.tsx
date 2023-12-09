import BeerRelevanceFeedbackProvider from "@/contexts/BeerRelevanceFeedbackContext"

interface SearchLayoutProps {
  children: JSX.Element
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  return (
    <BeerRelevanceFeedbackProvider>{children}</BeerRelevanceFeedbackProvider>
  )
}
