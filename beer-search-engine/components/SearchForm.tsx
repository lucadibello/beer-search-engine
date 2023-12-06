"use client"

import { Box, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react"
import QueryInput from "./QueryInput"

interface SearchFormProps {
  initialQuery?: string
  onSearch: (newQuery: string) => void
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
    <Box
      // Sticking to the top
      px={4}
      pb={5}
      w="100%"
      position="sticky"
      top="50px"
      zIndex="sticky"
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Box maxW={{ base: "100%", md: "3xl" }}>
        <QueryInput
          query={query}
          setQuery={setQuery}
          onSearch={onSearch}
          isLoading={isLoading}
          iconLocaton="right"
        />
      </Box>
    </Box>
  )
}
