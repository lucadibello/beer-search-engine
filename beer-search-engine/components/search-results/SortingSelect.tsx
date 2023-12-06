import {
  BeerSortingTarget,
  SortOrder,
  getSortOrders,
  getSortingTargets,
} from "@/util/sorter"
import { Box, Select, Stack } from "@chakra-ui/react"

interface SortingSelectProps {
  sortingTarget: BeerSortingTarget | "relevance"
  order: SortOrder
  onSortTargetChange?: (type: BeerSortingTarget) => void
  onOrderChange?: (order: SortOrder) => void
  isDisabled?: boolean
}

export default function SortingSelect({
  sortingTarget,
  order,
  onSortTargetChange,
  onOrderChange,
  isDisabled,
}: SortingSelectProps) {
  // Return the component
  return (
    <Stack
      spacing={5}
      direction={{ base: "column", md: "row" }}
      alignItems="center"
      justifyContent="flex-start"
    >
      <Select
        value={sortingTarget}
        fontSize={"xl"}
        onChange={(e) =>
          onSortTargetChange &&
          onSortTargetChange(e.target.value as BeerSortingTarget)
        }
        variant="unstyled"
        w="250px"
        isDisabled={isDisabled}
      >
        <option value="relevance">relevance</option>
        {getSortingTargets().map((key) => {
          return (
            <option key={key} value={key} label={key}>
              {key}
            </option>
          )
        })}
      </Select>

      {sortingTarget !== "relevance" && (
        <Box w="250px">
          <Select
            value={order}
            fontSize={"xl"}
            onChange={(e) =>
              onOrderChange && onOrderChange(e.target.value as SortOrder)
            }
            variant="unstyled"
            isDisabled={isDisabled}
          >
            {/* Map SortOrder enum values to options */}
            {getSortOrders().map((key) => {
              return (
                <option key={key} value={key} label={key}>
                  {key}
                </option>
              )
            })}
          </Select>
        </Box>
      )}
    </Stack>
  )
}
