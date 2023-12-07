import {
  Icon,
  IconButton,
  Text,
  Tooltip,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react"
import { useState } from "react"
import { FiLoader, FiSearch } from "react-icons/fi"

interface ExampleQueryItemProps {
  query: string
  onClick: (_query: string) => void | null
  isDisabled?: boolean
}

export default function ExampleQueryItem(props: ExampleQueryItemProps) {
  // Loading state
  const [loading, setLoading] = useState<boolean>(false)
  const [active, setActive] = useState<boolean>(false)

  return (
    <VStack
      w="full"
      spacing={2}
      justifyContent={"space-between"}
      cursor={props.isDisabled ? "not-allowed" : loading ? "wait" : "pointer"}
      onClick={() => {
        if (props.onClick && !props.isDisabled && !loading) {
          props.onClick(props.query)
          setLoading(true)
        }
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      _hover={{
        opacity: 0.8,
      }}
      backgroundColor={useColorModeValue("gray.100", "gray.700")}
      borderRadius="md"
      p={4}
    >
      <Text textAlign={"center"}>{props.query}</Text>

      <Tooltip label="Click to search" placement="bottom" hasArrow>
        <IconButton
          opacity={active ? 1 : 0}
          icon={loading ? <Icon as={FiLoader} /> : <Icon as={FiSearch} />}
          onClick={() => {
            if (props.onClick) {
              props.onClick(props.query)
              setLoading(true)
            }
          }}
          variant="ghost"
          size="md"
          isLoading={loading}
          isDisabled={props.isDisabled}
          aria-label={""}
        />
      </Tooltip>
    </VStack>
  )
}
