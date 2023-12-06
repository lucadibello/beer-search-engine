import { Highlight, Text } from "@chakra-ui/react"

interface HightlightWordsProps {
  keywords: string[] | string
  text: string
}

export function HightlightWords({ keywords, text }: HightlightWordsProps) {
  return (
    <Text fontSize="sm">
      <Highlight
        query={keywords || ""}
        styles={{
          fontWeight: "bold",
          py: ".5",
          bg: "blue.100",
          _hover: {
            bg: "yellow.300",
            transition: "all 0.2s ease-in-out",
          },
        }}
      >
        {text}
      </Highlight>
    </Text>
  )
}
