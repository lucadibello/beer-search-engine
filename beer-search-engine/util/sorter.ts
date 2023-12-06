import { Beer } from "@/service/beer-service"
import normalizeAndRoundRating from "./rating"

export type BeerSortingTarget = "abv" | "rating" | "name"
export type SortOrder = "ascending" | "descending"

type SortingFunctions = {
  [key in BeerSortingTarget]: {
    [key in SortOrder]: (a: Beer, b: Beer) => number
  }
}

const sortingFunctions: SortingFunctions = {
  abv: {
    ascending: (a: Beer, b: Beer) => a.alcohol_bv - b.alcohol_bv,
    descending: (a: Beer, b: Beer) => b.alcohol_bv - a.alcohol_bv,
  },
  rating: {
    ascending: (a: Beer, b: Beer) => normalizeScore(a) - normalizeScore(b),
    descending: (a: Beer, b: Beer) => normalizeScore(b) - normalizeScore(a),
  },
  name: {
    ascending: (a: Beer, b: Beer) => a.name.localeCompare(b.name),
    descending: (a: Beer, b: Beer) => b.name.localeCompare(a.name),
  },
}

// Wrapper to normalize and round beer score
const normalizeScore = (beer: Beer) =>
  normalizeAndRoundRating(beer.critic_score.actual, beer.critic_score.max)

export function sortBeers(
  beers: Beer[],
  target: BeerSortingTarget = "rating",
  order: SortOrder = "ascending",
) {
  const sortFunction = sortingFunctions[target]?.[order]
  if (!sortFunction) {
    throw new Error(`Unknown sorting target or order: ${target}, ${order}`)
  }
  // Copy array to avoid mutating the original + sort
  return [...beers].sort(sortFunction)
}

export function getSortingTargets(): BeerSortingTarget[] {
  return Object.keys(sortingFunctions) as BeerSortingTarget[]
}
export function getSortOrders(): SortOrder[] {
  return ["ascending", "descending"]
}
