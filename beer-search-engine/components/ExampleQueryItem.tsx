import { Button, HStack, ListItem } from "@chakra-ui/react";

interface ExampleQueryItemProps {
  query: String;
  onClick: (query: string) => void | null;
}

export default function ExampleQueryItem(props: ExampleQueryItemProps) {
  return (
    <ListItem>
      <HStack>
        <span>{props.query}</span>
        <Button
          onClick={() => props.onClick(props.query.toString())}
          variant='ghost'
          size='xs'
        >
          Try
        </Button>
      </HStack>
    </ListItem>
  )
}