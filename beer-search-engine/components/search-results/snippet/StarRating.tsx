import normalizeAndRoundRating from "@/util/rating"
import { HStack, Icon, Text, useColorModeValue } from "@chakra-ui/react"
import { FaStarHalfAlt, FaStar, FaRegStar } from "react-icons/fa"

interface StarRatingProps {
  rating: number
  maxRating?: number
}

type StarFillType = "full" | "half" | "empty"

interface StarProps {
  filled: StarFillType
}

function Star({ filled }: StarProps) {
  const color = useColorModeValue("yellow.400", "yellow.300")

  switch (filled) {
    case "full":
      return <Icon as={FaStar} color={color} />
    case "half":
      return <Icon as={FaStarHalfAlt} color={color} />
    case "empty":
      return <Icon as={FaRegStar} color={color} />
  }
}
export default function StarRating({ rating, maxRating = 5 }: StarRatingProps) {
  const displayRating = normalizeAndRoundRating(rating, maxRating, 2) // nearest half
  const textRating = normalizeAndRoundRating(rating, maxRating, 10) // nearest tenth

  return (
    <HStack spacing={1}>
      {[...Array(5)].map((_, i) => {
        const index = i + 1
        let filled: StarFillType
        if (displayRating >= index - 0.5 && displayRating < index) {
          filled = "half"
        } else if (displayRating >= index) {
          filled = "full"
        } else {
          filled = "empty"
        }
        return <Star key={i} filled={filled} />
      })}
      <Text fontWeight={"bold"} ml={1}>
        {textRating.toFixed(1)}
      </Text>
    </HStack>
  )
}
