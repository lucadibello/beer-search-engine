import { HStack, Icon } from "@chakra-ui/react";
import { FaStarHalfAlt, FaStar, FaRegStar } from 'react-icons/fa'

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

type StarFillType = 'full' | 'half' | 'empty';

interface StarProps {
  filled: StarFillType;
}

function Star({ filled }: StarProps) {
  switch (filled) {
    case 'full':
      return <Icon as={FaStar} color='yellow.500' />
    case 'half':
      return <Icon as={FaStarHalfAlt} color='yellow.500' />
    case 'empty':
      return <Icon as={FaRegStar} color='yellow.500' />
  }
}

/**
 * Normalize rating in range [0, 5]. Return value rounded to half star.
 * @param rating  The rating to normalize
 * @param maxRating  The maximum rating
 * @returns The normalized rating rounded to half star
 */
const normalizeRating = (rating: number, maxRating: number) => {
  const normalizedRating = Math.round((rating / maxRating) * 5 * 2) / 2
  return normalizedRating
}

export default function StarRating({ rating, maxRating = 5 }: StarRatingProps) {
  rating = normalizeRating(rating, maxRating)

  return (
    <HStack spacing={1}>
      {[...Array(5)].map((_, i) => {
        const index = i + 1;
        let filled: StarFillType;
        if (rating >= index - 0.5 && rating < index) {
          filled = 'half';
        } else if (rating >= index) {
          filled = 'full';
        } else {
          filled = 'empty';
        }
        return <Star key={i} filled={filled} />
      })}
      <span>{rating}</span>
    </HStack>
  )
}