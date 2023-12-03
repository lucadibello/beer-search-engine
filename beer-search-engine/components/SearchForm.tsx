'use client';

import { Box, Heading } from "@chakra-ui/react";
import { useState } from "react";
import QueryInput from "./QueryInput";

interface SearchFormProps {
  initialQuery?: string;
  onSearch: (newQuery: string) => void;
}

export default function SearchForm({ onSearch, initialQuery }: SearchFormProps) {
  // State to keep track of new query
  const [query, setQuery] = useState<string>(initialQuery || '');

  return (
    <Box>
      <Heading>Search</Heading>
      <Box mb={4} p={4}>
        <QueryInput
          query={query}
          setQuery={setQuery}
          onSearch={onSearch}
        />
      </Box>
    </Box>
  )
}

