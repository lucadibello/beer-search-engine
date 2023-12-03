import { InputGroup, InputLeftElement, Icon, Spinner, Input, InputRightElement, Tooltip } from "@chakra-ui/react"
import { useState } from "react"
import { FiMic, FiSearch } from "react-icons/fi"

interface QueryInputProps {
  query: string
  setQuery: (query: string) => void
  isLoading?: boolean
  onSearch?: (query: string) => void
}

export default function QueryInput({ query, setQuery, isLoading, onSearch }: QueryInputProps) {
  // State to keep track of active state
  const [active, setActive] = useState<boolean>(false)

  return (
    <InputGroup
      w="full"
      size='md'
      borderRadius='md'
      boxShadow={active ? 'md' : 'sm'}
      transition='all 0.2s ease-in-out'
      _hover={{
        boxShadow: 'md',
      }}
    >
      <InputLeftElement
        pointerEvents='none'
        color='gray.300'
        fontSize='1.2em'
      >
        {!isLoading ?
          <Icon
            as={isLoading ? FiMic : FiSearch}
            color='gray.300'
            _hover={{
              color: 'red'
            }}
          /> : <Spinner />
        }
      </InputLeftElement>
      <Input
        placeholder='Search for a beer'
        spellCheck={true} // Force spellcheck
        autoFocus
        isDisabled={isLoading}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch && onSearch(query)
          }
        }}
        // Disable blue border when focused
        _focus={{
          borderWidth: '1px',
          borderColor: 'gray.300',
          boxShadow: 'none'
        }}
      />
      <InputRightElement>
        {/* Voice input */}
        <Tooltip label='Voice input' aria-label='Voice input' placement='bottom' hasArrow>
          <span>
            <Icon
              as={FiMic}
              cursor={"pointer"}
              transition="all 0.2s ease-in-out"
              _hover={{
                color: "purple.500",
                transform: "scale(1.2)",
                // Transition on hover and release
                transition: "all 0.2s ease-in-out"
              }}
              onClick={() => {
                // Trigger voice input
                console.log('Voice input triggered')
              }}
            />
          </span>
        </Tooltip>
      </InputRightElement>
    </InputGroup>
  )
}