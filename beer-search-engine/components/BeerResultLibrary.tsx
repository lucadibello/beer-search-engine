import { Beer } from "@/service/beer-service";
import { Box, Button, Card, CardBody, CardFooter, HStack, Heading, Highlight, Stack, Text } from "@chakra-ui/react";

type BeerResultStackProps = {
  beers: Beer[];
  keywords?: string | string[];
}

interface BeerResultProps {
  beer: Beer;
  query?: string | string[];
}

const reduceDescription = (description: string, wordsLimit: number = 30) => {
  const words = description.split(' ')
  if (words.length > wordsLimit) {
    return words.slice(0, wordsLimit).join(' ') + '...'
  }
  return description
}

function BeerResult(props: BeerResultProps) {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='elevated'
      size='sm'
    >
      <Stack>
        <CardBody>
          <Heading size='sm'>{props.beer.name}</Heading>
          <Text fontSize='sm' color='gray.500'>
            <Highlight
              query={props.query || ""}
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
              {reduceDescription(props.beer.description)}
            </Highlight>
          </Text>
        </CardBody>

        <CardFooter>
          <Button
            variant='solid'
            colorScheme='blue'
            size='sm'
          >
            View
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  )
}

function BeerResultStack({ beers, keywords }: BeerResultStackProps) {
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
          />
        </Box>
      ))}
    </Stack>
  )
}

export default function BeerResultLibrary({ beers, keywords }: BeerResultStackProps) {
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
        flex={{ base: '0 0 100%', md: '0 0 65%' }}
        px={5}
      >
        <Heading size='md' mb={5}>Results</Heading>
        <BeerResultStack
          beers={beers}
          keywords={keywords}
        />
      </Box>

      {/* Rich results */}
      <Box
        w='100%'
        // Hide on smaller screens
        display={{ base: 'none', md: 'block' }}
      >
        <Heading size='md'>Rich results</Heading>
      </Box>
    </HStack>

  )
}