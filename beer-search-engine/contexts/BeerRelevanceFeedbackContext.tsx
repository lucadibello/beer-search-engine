"use client"

import { Beer } from "@/service/beer-service"
import { createContext, useContext, useState } from "react"

interface BeerRelevanceFeedbackContextType {
  // States
  relevantBeers: Beer[]
  irrelevantBeers: Beer[]

  // Setter methods
  addRelevantBeer: (_beer: Beer) => void
  addIrrelevantBeer: (_beer: Beer) => void
}

interface BeerRelevanceFeedbackProviderProps {
  children: JSX.Element
}

const BeerRelevanceFeedbackContext =
  createContext<BeerRelevanceFeedbackContextType>({
    // Default values
    irrelevantBeers: [],
    relevantBeers: [],
    addRelevantBeer: function (_beer: Beer): {} {
      throw new Error("Function not implemented.")
    },
    addIrrelevantBeer: function (_beer: Beer): {} {
      throw new Error("Function not implemented.")
    },
  })

export function useBeerRelevanceFeedback() {
  return useContext(BeerRelevanceFeedbackContext)
}

export default function BeerRelevanceFeedbackProvider({
  children,
}: BeerRelevanceFeedbackProviderProps) {
  // States
  const [relevantBeers, setRelevantBeers] = useState<Beer[]>([])
  const [irrelevantBeers, setIrrelevantBeers] = useState<Beer[]>([])

  // Functions
  function addRelevantBeer(_beer: Beer) {
    setRelevantBeers([...relevantBeers, _beer])
  }

  function addIrrelevantBeer(_beer: Beer) {
    setIrrelevantBeers([...irrelevantBeers, _beer])
  }

  return (
    <BeerRelevanceFeedbackContext.Provider
      value={{
        relevantBeers,
        irrelevantBeers,
        addRelevantBeer,
        addIrrelevantBeer,
      }}
    >
      {children}
    </BeerRelevanceFeedbackContext.Provider>
  )
}
