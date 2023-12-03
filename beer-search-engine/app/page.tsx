'use client';

import { Box, Container, Flex, Heading, Icon, Input, InputGroup, InputLeftElement, InputRightElement, Spinner, Tooltip, UnorderedList } from '@chakra-ui/react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Import image
import logo from '@/public/logo.png'
import ExampleQueryItem from '@/components/ExampleQueryItem';
import { preloadSearch } from '@/service';
import QueryInput from '@/components/QueryInput';

export default function HomePage() {

  // State to keep track of the query
  const [query, setQuery] = useState<string>('');

  // Loading state
  const [loading, setLoading] = useState<boolean>(false);

  // Load router
  const { push } = useRouter()

  // utility function to redirect
  const search = () => {
    // URL encode query
    const encodedQuery = encodeURIComponent(query)
    // Preload search API
    preloadSearch(encodedQuery)
    // Redirect to search page
    push(`/search?q=${encodedQuery}`)
  }
  const tryQuery = (query: string) => {
    // Fill query
    setQuery(query)
    // Trigger search
    search()
  }

  return (
    <Container centerContent>
      <Flex direction="column" align="center" justify="center" h="60vh">
        {/* Logo */}
        <Box mb={8}>
          <Image
            alt='Beer Search Engine logo'
            src={logo}
            placeholder='blur'
            style={{
              width: '500px',
              height: 'auto',
            }}
          />
        </Box>

        <QueryInput
          query={query}
          setQuery={setQuery}
          isLoading={loading}
          onSearch={() => {
            // Set loading state
            setLoading(true)
            // Search beers based on query
            search()
          }}
        />

        <Heading as="h2" size="md" mt={8}>
          Example query:
        </Heading>
        <UnorderedList>
          <ExampleQueryItem query='What&apos;s a beer that tastes like chocolate?' onClick={tryQuery} isDisabled={loading} />
          <ExampleQueryItem query="What&apos;s a beer perfect for a hot summer day?" onClick={tryQuery} isDisabled={loading} />
          <ExampleQueryItem query="What&apos;s the best beer for a party?" onClick={tryQuery} isDisabled={loading} />
        </UnorderedList>
      </Flex>
    </Container>
  )
}
