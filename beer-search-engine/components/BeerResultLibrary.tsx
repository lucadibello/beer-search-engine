'use client';

import { Beer } from "@/service/beer-service";
import { Box, Button, Card, CardBody, CardFooter, HStack, Heading, Highlight, IconButton, Stack, Text, Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { FiMaximize2, FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import RelevanceFeedback from "./RelevanceFeedback";

type BeerResultStackProps = {
  totalHits?: number;
  beers: Beer[];
  keywords?: string | string[];
  onClick?: (beer: Beer) => void;
  enableRichResults?: boolean;
}

interface BeerResultProps {
  beer: Beer;
  query?: string | string[];
  onClick?: (beer: Beer) => void;
}

const reduceDescription = (description: string, wordsLimit: number = 30) => {
  const words = description.split(' ')
  if (words.length > wordsLimit) {
    return words.slice(0, wordsLimit).join(' ') + '...'
  }
  return description
}

function BeerResult({ query, beer, onClick }: BeerResultProps) {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='elevated'
      size='sm'
      w='100%'
    >
      <Stack w='100%'>
        <CardBody>
          <HStack spacing={2}>
            <Heading size='sm'>{beer.name}</Heading>
            {beer.alcohol_bv > 0 && (
              <Text fontSize='sm' color='gray.500'>({beer.alcohol_bv.toFixed(1)}%)</Text>
            )}

            {/* Spacer */}
            <Box flex={1} />

            {/* Relevance feedback buttons */}
            <RelevanceFeedback onRelevant={() => {
              console.log(beer, 'marked as relevant')
            }} onIrrelevant={() => {
              console.log(beer, 'marked as irrelevant')
            }} />
          </HStack>
          <Text fontSize='sm' color='gray.500'>
            <Highlight
              query={query || ""}
              styles={{
                px: '2',
                py: '1',
                rounded: 'full',
                bg: 'yellow.200',
                _hover: {
                  bg: 'yellow.300',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
            >
              {reduceDescription(beer.description)}
            </Highlight>
          </Text>
        </CardBody>

        <CardFooter>
          <HStack // space around
            spacing={2}
            justifyContent={'space-between'}
            w='100%'
          >
            {/* Beer page button */}
            <Button
              variant='solid'
              colorScheme='blue'
              size='sm'
            >
              View
            </Button>

            {/* View details button */}
            <Tooltip label='View details' hasArrow>
              <IconButton
                aria-label='View details'
                icon={<FiMaximize2 />}
                variant='ghost'
                colorScheme='info'
                size='sm'
                onClick={onClick ? () => onClick(beer) : undefined}
              />
            </Tooltip>
          </HStack>
        </CardFooter>
      </Stack>
    </Card>
  )
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
          <BeerResult
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