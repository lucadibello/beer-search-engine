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

  // Utility methods
  isBeerRelevant: (_beer: Beer) => boolean
  isBeerIrrelevant: (_beer: Beer) => boolean
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
    isBeerIrrelevant: function (_beer: Beer): boolean {
      throw new Error("Function not implemented.")
    },
    isBeerRelevant: function (_beer: Beer): boolean {
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
    if (!relevantBeers.includes(_beer)) {
      setRelevantBeers([...relevantBeers, _beer])
    }
    // Remove from irrelevant beers if present
    if (irrelevantBeers.includes(_beer)) {
      setIrrelevantBeers(irrelevantBeers.filter((beer) => beer !== _beer))
    }
  }

  function addIrrelevantBeer(_beer: Beer) {
    if (!irrelevantBeers.includes(_beer)) {
      setIrrelevantBeers([...irrelevantBeers, _beer])
    }
    // Remove from relevant beers if present
    if (relevantBeers.includes(_beer)) {
      setRelevantBeers(relevantBeers.filter((beer) => beer !== _beer))
    }
  }

  function isBeerRelevant(_beer: Beer) {
    return relevantBeers.includes(_beer)
  }

  function isBeerIrrelevant(_beer: Beer) {
    return irrelevantBeers.includes(_beer)
  }

  return (
    <BeerRelevanceFeedbackContext.Provider
      value={{
        relevantBeers,
        irrelevantBeers,
        addRelevantBeer,
        addIrrelevantBeer,
        isBeerIrrelevant,
        isBeerRelevant,
      }}
    >
      {children}
    </BeerRelevanceFeedbackContext.Provider>
  )
}
