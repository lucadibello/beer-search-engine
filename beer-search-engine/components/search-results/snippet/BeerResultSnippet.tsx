import RelevanceFeedback from "./RelevanceFeedback";
import { Beer } from "@/service/beer-service";
import { Card, Image, Stack, CardBody, HStack, Heading, CardFooter, Button, Tooltip, IconButton, Box, Text } from "@chakra-ui/react";
import StarRating from "./StarRating";
import { BreweryLocation } from "./BreweryLocation";
import { HightlightWords } from "../../HightlightWords";


interface BeerResultSnippetProps {
  beer: Beer;
  keywords?: string | string[];
  onClick?: (beer: Beer) => void;
}

const reduceDescription = (description: string, wordsLimit: number = 30) => {
  const words = description.split(' ')
  if (words.length > wordsLimit) {
    return words.slice(0, wordsLimit).join(' ') + '...'
  }
  return description
}

export default function BeerResultSnippet({ keywords, beer, onClick }: BeerResultSnippetProps) {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='elevated'
      size='sm'
      w='100%'
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src={beer.image_url || 'https://via.placeholder.com/200'}
        alt='Caffe Latte'
      />

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

          {/* card content */}
          <Stack direction='column' spacing={2}>
            {/* Brewery location */}
            <BreweryLocation brewer={beer.brewer} />

            {/* Description */}
            <Box>
              <Heading size='xs' mt={2}>
                Description
              </Heading>
              {beer.description ? (
                <HightlightWords keywords={keywords || []} text={reduceDescription(beer.description)} />
              ) : (
                <Text fontSize='sm'>
                  No description available
                </Text>
              )}
            </Box>

            {/* Alcohol */}
            <Box>
              <Heading size='xs' mt={2}>
                Alcohol by volume (ABV)
              </Heading>
              {beer.alcohol_bv > 0 && (
                <Text fontSize='sm'>
                  {beer.alcohol_bv.toFixed(1)}%
                </Text>
              )}
            </Box>
          </Stack>
        </CardBody>

        <CardFooter>
          {/* Beer page button */}
          <Button
            variant='solid'
            colorScheme='blue'
            size='sm'
            onClick={onClick ? () => onClick(beer) : undefined}
          >
            View
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  )
}