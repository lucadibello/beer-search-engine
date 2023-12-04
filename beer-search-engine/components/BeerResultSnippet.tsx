
import { FiMaximize2, FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import RelevanceFeedback from "./RelevanceFeedback";
import { Beer } from "@/service/beer-service";
import { Card, Stack, CardBody, HStack, Heading, Highlight, CardFooter, Button, Tooltip, IconButton, Box, Text } from "@chakra-ui/react";
import StarRating from "./StarRating";


interface BeerResultSnippetProps {
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

export default function BeerResultSnippet({ query, beer, onClick }: BeerResultSnippetProps) {
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

            {beer.critic_score.actual > 0 && (
              <StarRating
                rating={beer.critic_score.actual}
                maxRating={beer.critic_score.max}
              />
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

            {JSON.stringify(beer)}
          </Text>

          {beer.alcohol_bv > 0 && (
            <Text fontSize='sm' color='gray.500'>({beer.alcohol_bv.toFixed(1)}%)</Text>
          )}
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