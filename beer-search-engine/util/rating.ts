/**
 * Normalize and round a rating.
 * @param rating The rating to normalize
 * @param maxRating The maximum rating
 * @param roundingMultiplier The multiplier for rounding (e.g., 2 for half, 10 for tenth)
 * @returns The normalized and rounded rating
 */
export default function normalizeAndRoundRating(
  rating: number,
  maxRating: number,
  roundingMultiplier?: number,
): number {
  const baseValue = (rating / maxRating) * 5

  if (!roundingMultiplier) {
    return baseValue
  } else if (roundingMultiplier < 1) {
    throw new Error("Rounding multiplier must be greater than or equal to 1")
  }

  return Math.round(baseValue * roundingMultiplier) / roundingMultiplier
}
