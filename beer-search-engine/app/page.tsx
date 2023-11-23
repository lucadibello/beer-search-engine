'use client'

import { Container, Flex, Heading, Icon, Input, InputGroup, InputLeftElement, InputRightElement, ListItem, Tooltip, UnorderedList } from '@chakra-ui/react'
import { useState } from 'react';
import { FiSearch, FiMic } from 'react-icons/fi'

export default function Home() {

  // State to keep track of the query
  const [query, setQuery] = useState<String>('');

  // State to keep track if active or not
  const [active, setActive] = useState<Boolean>(false);

  return (
    <Container centerContent>

      <Flex direction="column" align="center" justify="center" h="70vh">
        <Heading as="h1" size="2xl" mb={4}>
          Beer Search Engine
        </Heading>

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
          <InputLeftElement pointerEvents='none'
            color='gray.300'
            fontSize='1.2em'
          >
            <Icon
              as={FiSearch}
              color='gray.300'
              _hover={{
                color: 'red'
              }}
            />
          </InputLeftElement>
          <Input
            placeholder='Search for a beer'
            spellCheck={true} // Force spellcheck
            autoFocus
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // Trigger search
                console.log('Search triggered: ', query)
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
          <ListItem>What&apos;s a beer that tastes like chocolate?</ListItem>
          <ListItem>What&apos;s a beer perfect for a hot summer day?</ListItem>
          <ListItem>What&apos;s the best beer for a party?</ListItem>
        </UnorderedList>
      </Flex>
    </Container>
  )
}
