import { Button, HStack, ListItem } from "@chakra-ui/react";
import { useState } from "react";

interface ExampleQueryItemProps {
  query: string;
  onClick: (query: string) => void | null;
  isDisabled?: boolean;
}

export default function ExampleQueryItem(props: ExampleQueryItemProps) {
  // Loading state
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <ListItem>
      <HStack>
        <span>{props.query}</span>
        <Button
          onClick={() => {
            if (props.onClick) {
              props.onClick(props.query)
              setLoading(true)
            }
          }}
          variant='ghost'
          size='xs'
          isLoading={loading}
          isDisabled={props.isDisabled}
        >
          Try
        </Button>
      </HStack>
    </ListItem>
  )
}