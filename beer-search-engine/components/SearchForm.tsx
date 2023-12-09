"use client"

import { Box } from "@chakra-ui/react"
import { useState } from "react"
import QueryInput from "./QueryInput"

interface SearchFormProps {
  initialQuery?: string
  onSearch: (_newQuery: string) => void
  isLoading?: boolean
}

export default function SearchForm({
  onSearch,
  initialQuery,
  isLoading,
}: SearchFormProps) {
  // State to keep track of new query
  const [query, setQuery] = useState<string>(initialQuery || "")

  return (
    <Box maxW={{ base: "100%", md: "3xl" }}>
      <QueryInput
        query={query}
        setQuery={setQuery}
        onSearch={onSearch}
        isLoading={isLoading}
        iconLocaton="right"
      />
    </Box>
  )
}
