"use client"

import {
  Box,
  Container,
  Flex,
  Heading,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Import image
import logoDarkMode from "@/public/logo-dark-mode.png"
import logoLightMode from "@/public/logo-light-mode.png"

import ExampleQueryItem from "@/components/ExampleQueryItem"
import { preloadSearch } from "@/service"
import QueryInput from "@/components/QueryInput"

export default function HomePage() {
  // State to keep track of the query
  const [inputQuert, setInputQuery] = useState<string>("")

  // Loading state
  const [loading, setLoading] = useState<boolean>(false)

  // Load router
  const { push } = useRouter()

  // utility function to redirect
  const search = (query: string) => {
        // URL encode query
        const encodedQuery = encodeURIComponent(query)
      // Preload search API
    preloadSearch(encodedQuery)
    // Redirect to search page
    push(`/search?q=${encodedQuery}`)
  }
  const tryQuery = (query: string) => {
    // Fill query + search
    setInputQuery(query)
    // Search beers based on query
    search(query)
  }

  return (
    <Container centerContent>
      <Flex direction="column" align="center" justify="center" h="60vh">
        {/* Logo */}
        <Box mb={8}>
          <Image
            alt="Beer Search Engine logo"
            src={useColorModeValue(logoLightMode, logoDarkMode)}
            style={{
              width: "500px",
              height: "auto",
            }}
          />
        </Box>

        <QueryInput
          query={inputQuert}
          setQuery={setInputQuery}
          isLoading={loading}
          onSearch={(query) => {
            // Set loading state
            setLoading(true)
            // Search beers based on query
            search(query)
          }}
        />

        <Heading as="h2" size="md" mt={8}>
          Example query:
        </Heading>
        <UnorderedList gap={2} mt={4}>
          <ExampleQueryItem
            query="What's a beer that tastes like chocolate?"
            onClick={tryQuery}
            isDisabled={loading}
          />
          <ExampleQueryItem
            query="What's a beer perfect for a hot summer day?"
            onClick={tryQuery}
            isDisabled={loading}
          />
          <ExampleQueryItem
            query="What's the best beer for a party?"
            onClick={tryQuery}
            isDisabled={loading}
          />
        </UnorderedList>
      </Flex>
    </Container>
  )
}
