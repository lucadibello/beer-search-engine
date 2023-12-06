import {
  BeerSortingTarget,
  SortOrder,
  getSortOrders,
  getSortingTargets,
} from "@/util/sorter"
import { Select, Stack } from "@chakra-ui/react"

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
      {/* Hidden label for screen readers */}
      <label htmlFor="sorting" style={{ display: "none" }}>
        Sorting
      </label>

      <Select
        id="sorting"
        aria-label="sorting"
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
        <option value="relevance" label="relevance">
          relevance
        </option>
        {getSortingTargets().map((key) => {
          return (
            <option key={key} value={key} label={key}>
              {key}
            </option>
          )
        })}
      </Select>

      {sortingTarget !== "relevance" && (
        <>
          <label htmlFor="order" style={{ display: "none" }}>
            order
          </label>
          <Select
            aria-label="order"
            id="order"
            value={order}
            fontSize={"xl"}
            onChange={(e) =>
              onOrderChange && onOrderChange(e.target.value as SortOrder)
            }
            variant="unstyled"
            isDisabled={isDisabled}
            w="250px"
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
        </>
      )}
    </Stack>
  )
}
