import {
  BeerSortingTarget,
  SortOrder,
  getSortOrders,
  getSortingTargets,
} from "@/util/sorter"
import { HStack, Select } from "@chakra-ui/react"

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
    <HStack spacing={5}>
      <Select
        value={sortingTarget}
        color={"gray"}
        fontSize={"xl"}
        onChange={(e) =>
          onSortTargetChange &&
          onSortTargetChange(e.target.value as BeerSortingTarget)
        }
        size="sm"
        variant="unstyled"
        pr={5}
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
        <Select
          value={order}
          color={"gray"}
          fontSize={"xl"}
          onChange={(e) =>
            onOrderChange && onOrderChange(e.target.value as SortOrder)
          }
          size="sm"
          variant="unstyled"
          pr={5}
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
      )}
    </HStack>
  )
}
