import { HStack, Spinner } from "@chakra-ui/react"

interface LoaderProps {
  text?: string
}

export default function Loader({ text = "Loading..." }: LoaderProps) {
  return (
    <HStack spacing={2} align="center" justify="center">
      <Spinner />
      <span>{text}</span>
    </HStack>
  )
}
