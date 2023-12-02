'use client'

import { Box, Container, Flex, Heading, Icon, Input, InputGroup, InputLeftElement, InputRightElement, ListItem, Spinner, Tooltip, UnorderedList } from '@chakra-ui/react'
import Image from 'next/image';
import { RedirectType, redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiSearch, FiMic } from 'react-icons/fi'

// Import image
import logo from '@/public/logo.png'
import ExampleQueryItem from '@/components/ExampleQueryItem';
import { preloadSearch } from '@/service';

export default function Home() {

  // State to keep track of the query
  const [query, setQuery] = useState<string>('');

  // State to keep track if active or not
  const [active, setActive] = useState<boolean>(false);

  // Loading state
  const [loading, setLoading] = useState<boolean>(false);

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
    // Fill query
    setQuery(query)
    // Trigger search
    search(query)
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

        <InputGroup
          w="full"
          maxW="xl"
          size='md'
          borderRadius='md'
          boxShadow={active ? 'md' : 'sm'}
          transition='all 0.2s ease-in-out'
          _hover={{
            boxShadow: 'md',
          }}
        >
          <InputLeftElement
            pointerEvents='none'
            color='gray.300'
            fontSize='1.2em'
          >
            {!loading ?
              <Icon
                as={loading ? FiMic : FiSearch}
                color='gray.300'
                _hover={{
                  color: 'red'
                }}
              /> : <Spinner />
            }
          </InputLeftElement>
          <Input
            placeholder='Search for a beer'
            spellCheck={true} // Force spellcheck
            autoFocus
            isDisabled={loading}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // Set loading state
                setLoading(true)

                // Search beers!
                search(query)
              }
            }}
            // Disable blue border when focused
            _focus={{
              borderWidth: '1px',
              borderColor: 'gray.300',
              boxShadow: 'none'
            }}
          />
          <InputRightElement>
            {/* Voice input */}
            <Tooltip label='Voice input' aria-label='Voice input' placement='bottom' hasArrow>
              <span>
                <Icon
                  as={FiMic}
                  cursor={"pointer"}
                  transition="all 0.2s ease-in-out"
                  _hover={{
                    color: "purple.500",
                    transform: "scale(1.2)",
                    // Transition on hover and release
                    transition: "all 0.2s ease-in-out"
                  }}
                  onClick={() => {
                    // Trigger voice input
                    console.log('Voice input triggered')
                  }}
                />
              </span>
            </Tooltip>
          </InputRightElement>
        </InputGroup>

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
