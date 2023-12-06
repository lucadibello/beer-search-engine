import RelevanceFeedback from "./RelevanceFeedback"
import { Beer } from "@/service/beer-service"
import {
  Card,
  Stack,
  CardBody,
  HStack,
  Heading,
  CardFooter,
  Button,
  Box,
  Text,
  Flex,
  Icon,
} from "@chakra-ui/react"
import StarRating from "./StarRating"
import { BreweryLocation } from "./BreweryLocation"
import { HightlightWords } from "../../HightlightWords"
import ImageWithFallback from "@/components/ImageWithFallback"
import { FiInfo } from "react-icons/fi"

interface BeerResultSnippetProps {
  beer: Beer
  keywords?: string | string[]
  onClick?: (beer: Beer) => void
}

const reduceDescription = (description: string, wordsLimit: number = 30) => {
  const words = description.split(" ")
  if (words.length > wordsLimit) {
    return words.slice(0, wordsLimit).join(" ") + "..."
  }
  return description
}

export default function BeerResultSnippet({
  keywords,
  beer,
  onClick,
}: BeerResultSnippetProps) {
  const HighlightWrapper = ({ children }: { children: string }) => {
    if (keywords && keywords.length > 0) {
      return <HightlightWords keywords={keywords} text={children} />
    }
    return children
  }

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="elevated"
      size="sm"
      w="100%"
    >
      {/* Beer image / Placeholder if not available */}
      <Box w={"200px"} h="fill" overflow="hidden" position="relative">
        <ImageWithFallback
          src={beer.image_url || "/images/beer-placeholder.png"}
          fallbackSrc="/images/fallback.webp"
          alt={beer.name}
          loading="lazy"
          fill={true}
          sizes="200px"
          style={{
            objectFit: "contain",
          }}
        />
      </Box>

      <Stack w="100%">
        <CardBody>
          <HStack justify="space-between" align="center" w="100%">
            <Flex
              gap={2}
              direction={{ base: "column", md: "row" }}
              // Middle align
              alignItems={{ base: "flex-start", md: "center" }}
            >
              <Heading size="sm">{beer.name}</Heading>

              {beer.critic_score.actual > 0 ? (
                <StarRating
                  rating={beer.critic_score.actual}
                  maxRating={beer.critic_score.max}
                />
              ) : (
                <Text fontSize="sm">No rating available</Text>
              )}
            </Flex>

            {/* Relevance feedback buttons */}
            <RelevanceFeedback
              onRelevant={() => {
                console.log(beer, "marked as relevant")
              }}
              onIrrelevant={() => {
                console.log(beer, "marked as irrelevant")
              }}
            />
          </HStack>

          {/* card content */}
          <Stack direction="column" spacing={2}>
            {/* Brewery location */}
            <BreweryLocation brewer={beer.brewer} />

            {/* Description */}
            <Box>
              <Heading size="xs" mt={2}>
                Description
              </Heading>
              {beer.description ? (
                <HighlightWrapper>
                  {reduceDescription(beer.description)}
                </HighlightWrapper>
              ) : (
                <Text fontSize="sm">No description available</Text>
              )}
            </Box>

            {/* Alcohol */}
            <Box>
              <Heading size="xs" mt={2}>
                Alcohol by volume (ABV)
              </Heading>
              {beer.alcohol_bv > 0 ? (
                <HighlightWrapper>
                  {beer.alcohol_bv.toFixed(1) + "%"}
                </HighlightWrapper>
              ) : (
                <Text fontSize="sm">No information available</Text>
              )}
            </Box>

            {/* Bitterness */}
            <Box>
              <Heading size="xs" mt={2}>
                Taste notes
              </Heading>

              {beer.tasting_notes ? (
                <HighlightWrapper>{beer.tasting_notes}</HighlightWrapper>
              ) : (
                <Text fontSize="sm">No information available</Text>
              )}
            </Box>
          </Stack>
        </CardBody>

        <CardFooter>
          {/* Beer page button */}
          <Button
            variant="solid"
            colorScheme="blue"
            size="sm"
            leftIcon={<Icon as={FiInfo} />}
            onClick={onClick ? () => onClick(beer) : undefined}
          >
            View details
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  )
}
