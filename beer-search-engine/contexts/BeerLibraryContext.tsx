"use client"

import { Beer } from "@/service/beer-service"
import { createContext, useContext, useState } from "react"

interface BeerLibraryContextType {
  // States
  beers: Beer[]
  totalHits: number

  // Setter methods
  setBeers: (_beers: Beer[]) => void
  setTotalHits: (_totalHits: number) => void
}

interface BeerLibraryProviderProps {
  children: JSX.Element
}

const BeerLibraryContext = createContext<BeerLibraryContextType>({
  // Default values
  beers: [],
  totalHits: 0,
  setBeers: function (_beers: Beer[]): void {
    throw new Error("Function not implemented.")
  },
  setTotalHits: function (_totalHits: number): void {
    throw new Error("Function not implemented.")
  },
})

export function useBeerLibrary() {
  return useContext(BeerLibraryContext)
}

export default function BeerLibraryProvider({
  children,
}: BeerLibraryProviderProps) {
  // States
  const [beers, setBeers] = useState<Beer[]>([])
  const [totalHits, setTotalHits] = useState<number>(0)

  // Return provider
  return (
    <BeerLibraryContext.Provider
      value={{ beers, setBeers, totalHits, setTotalHits }}
    >
      {children}
    </BeerLibraryContext.Provider>
  )
}
