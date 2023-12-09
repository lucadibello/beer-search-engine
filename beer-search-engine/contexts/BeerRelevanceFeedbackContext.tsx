"use client"

import { Beer } from "@/service/beer-service"
import { createContext, useContext, useState } from "react"

interface BeerRelevanceFeedbackContextType {
  // States
  relevantBeers: Beer[]
  irrelevantBeers: Beer[]
  weightedQuery: string

  // Setter methods
  setWeightedQuery: (_weightedQuery: string) => void
  setRelevantBeers: (_relevantBeers: Beer[]) => void
  setIrrelevantBeers: (_irrelevantBeers: Beer[]) => void

  // Utility methods
  addRelevantBeer: (_beer: Beer) => void
  addIrrelevantBeer: (_beer: Beer) => void
  removeRelevantBeer: (_beer: Beer) => void
  removeIrrelevantBeer: (_beer: Beer) => void
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
    weightedQuery: "",
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
    removeRelevantBeer: function (_beer: Beer): void {
      throw new Error("Function not implemented.")
    },
    removeIrrelevantBeer: function (_beer: Beer): void {
      throw new Error("Function not implemented.")
    },
    setWeightedQuery: function (_weightedQuery: string): void {
      throw new Error("Function not implemented.")
    },
    setRelevantBeers: function (_relevantBeers: Beer[]): void {
      throw new Error("Function not implemented.")
    },
    setIrrelevantBeers: function (_irrelevantBeers: Beer[]): void {
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
  const [weightedQuery, setWeightedQuery] = useState<string>("")

  // Functions
  function addRelevantBeer(_beer: Beer) {
    if (!relevantBeers.includes(_beer)) {
      setRelevantBeers([...relevantBeers, _beer])
    }
    // Remove from irrelevant beers if present
    if (irrelevantBeers.includes(_beer)) {
      removeIrrelevantBeer(_beer)
    }
  }

  function addIrrelevantBeer(_beer: Beer) {
    if (!irrelevantBeers.includes(_beer)) {
      setIrrelevantBeers([...irrelevantBeers, _beer])
    }
    // Remove from relevant beers if present
    if (relevantBeers.includes(_beer)) {
      removeRelevantBeer(_beer)
    }
  }

  function removeRelevantBeer(_beer: Beer) {
    setRelevantBeers(relevantBeers.filter((beer) => beer !== _beer))
  }

  function removeIrrelevantBeer(_beer: Beer) {
    setIrrelevantBeers(irrelevantBeers.filter((beer) => beer !== _beer))
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
        removeRelevantBeer,
        removeIrrelevantBeer,
        addRelevantBeer,
        addIrrelevantBeer,
        isBeerIrrelevant,
        isBeerRelevant,
        weightedQuery,
        setWeightedQuery,
        setRelevantBeers,
        setIrrelevantBeers,
      }}
    >
      {children}
    </BeerRelevanceFeedbackContext.Provider>
  )
}
