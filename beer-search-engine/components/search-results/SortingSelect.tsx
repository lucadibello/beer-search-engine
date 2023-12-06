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
}

export default function SortingSelect({
  sortingTarget,
  order,
  onSortTargetChange,
  onOrderChange,
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
        color={"gray"}
        fontSize={"xl"}
        onChange={(e) =>
          onSortTargetChange &&
          onSortTargetChange(e.target.value as BeerSortingTarget)
        }
        variant="unstyled"
        w="250px"
      >
        <option value="relevance">relevance</option>
        {getSortingTargets().map((key) => {
          return (
            <option key={key} value={key}>
              {key}
            </option>
          )
        })}
      </Select>

      {sortingTarget !== "relevance" && (
        <Box w="250px">
          <Select
            value={order}
            color={"gray"}
            fontSize={"xl"}
            onChange={(e) =>
              onOrderChange && onOrderChange(e.target.value as SortOrder)
            }
            variant="unstyled"
          >
            {/* Map SortOrder enum values to options */}
            {getSortOrders().map((key) => {
              return (
                <option key={key} value={key}>
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
