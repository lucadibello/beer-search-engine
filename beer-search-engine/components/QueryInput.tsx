import {
  InputGroup,
  InputLeftElement,
  Icon,
  Spinner,
  Input,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react"
import { useState } from "react"
import { FiSearch } from "react-icons/fi"

interface QueryInputProps {
  query: string
  setQuery: (_query: string) => void
  isLoading?: boolean
  showVoiceInput?: boolean
  onSearch?: (_query: string) => void
  iconLocaton?: "left" | "right"
}

export default function QueryInput({
  query,
  setQuery,
  isLoading,
  onSearch,
  iconLocaton = "left",
}: QueryInputProps) {
  // State to keep track of active state
  const [active, setActive] = useState<boolean>(false)

  return (
    <InputGroup
      w="full"
      size="md"
      borderRadius="md"
      boxShadow={active ? "md" : "sm"}
      transition="all 0.2s ease-in-out"
      _hover={{
        boxShadow: "md",
      }}
    >
      {iconLocaton === "left" && (
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
        >
          {!isLoading ? (
            <Icon
              as={FiSearch}
              cursor={"pointer"}
              zIndex={10}
              color="gray.300"
            />
          ) : (
            <Spinner />
          )}
        </InputLeftElement>
      )}
      <Input
        placeholder="Search for a beer"
        spellCheck={true} // Force spellcheck
        zIndex={0}
        autoFocus
        isDisabled={isLoading}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch && onSearch(query)
          }
        }}
        // Disable blue border when focused
        _focus={{
          borderWidth: "1px",
          borderColor: "gray.300",
          boxShadow: "none",
        }}
      />
      {iconLocaton === "right" && (
        <InputRightElement>
          <Tooltip
            label="Search"
            aria-label="Search"
            placement="bottom"
            hasArrow
            isDisabled={isLoading}
          >
            <span>
              {!isLoading ? (
                <Icon
                  as={FiSearch}
                  cursor={"pointer"}
                  transition="all 0.2s ease-in-out"
                  _hover={{
                    color: "gray.500",
                    transform: "scale(1.2)",
                    // Transition on hover and release
                    transition: "all 0.2s ease-in-out",
                  }}
                  onClick={() => {
                    // Trigger voice input
                    onSearch && onSearch(query)
                  }}
                />
              ) : (
                <Spinner />
              )}
            </span>
          </Tooltip>
        </InputRightElement>
      )}
    </InputGroup>
  )
}
