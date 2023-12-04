'use client';

import { Beer } from "@/service/beer-service";
import { Box, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import BeerResultSnippet from "./BeerResultSnippet";

type BeerResultStackProps = {
  totalHits?: number;
  beers: Beer[];
  keywords?: string | string[];
  onClick?: (beer: Beer) => void;
  enableRichResults?: boolean;
}


function BeerResultStack({ beers, keywords, onClick }: BeerResultStackProps) {
  return (
    <Stack
      spacing={4}
      direction='column'
      align='flex-start'
      justify='left'
    >
      {beers.map((beer) => (
        <Box key={beer.docno} w='100%'>
          <BeerResultSnippet
            query={keywords || []}
            beer={beer}
            onClick={onClick}
          />
        </Box>
      ))}
    </Stack>
  )
}

export default function BeerResultLibrary({
  beers,
  keywords,
  totalHits,
  enableRichResults = false
}: BeerResultStackProps) {
  const [beer, setBeer] = useState<Beer | null>(null)

  return (
    <HStack
      spacing={4}
      w='100%'
      align='flex-start'
      justify='left'
    >
      {/* Results stack */}
      <Box
        w='100%'
        // Occupy 70% of the flex container
        flex={beer ? { base: '0 0 100%', md: '0 0 65%' } : {}}
        px={5}
      >
        <Heading size='md' mb={5}>
          Results:

          {totalHits && (
            <span style={{ marginLeft: '10px' }}>
              {totalHits} results
            </span>
          )}

          <span style={{ color: 'gray' }}>
            {' '}ordered by relevance
          </span>
        </Heading>
        <BeerResultStack
          beers={beers}
          keywords={keywords}
          onClick={enableRichResults ? (beer) => setBeer(beer) : undefined}
        />
      </Box>

      {/* Rich results */}
      {beer && (
        <Box
          w='100%'
          // Hide on smaller screens
          display={{ base: 'none', md: 'block' }}
        >
          <Heading size='md'>Details</Heading>
          <Box>
            <Image
              src={beer.image_url}
              width={200}
              height={200}
              alt={`${beer.name} image`}
            />

            <img src={beer.image_url} alt={`${beer.name} image`} />

            <Heading size='md'>{beer.name}</Heading>
            <Text fontSize='sm' color='gray.500'>
              {beer.style}
            </Text>
            <Text fontSize='sm' color='gray.500'>
              {beer.description}
            </Text>
          </Box>
        </Box>
      )}
    </HStack>
  )
}