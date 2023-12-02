import { Beer } from "@/service/beer-service";
import { Button, Card, CardBody, CardFooter, Heading, Highlight, Stack, Text } from "@chakra-ui/react";

interface BeerResultProps {
  beer: Beer;
  query?: string | string[];
}

export default function BeerResult(props: BeerResultProps) {
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
              {props.beer.description}
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