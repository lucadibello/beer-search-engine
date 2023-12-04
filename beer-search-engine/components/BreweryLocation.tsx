import { Brewer } from "@/service/beer-service";
import { HStack, Box, Text, Icon } from "@chakra-ui/react";
import { FaBeer } from "react-icons/fa";

export interface BreweryLocationProps {
  brewer: Brewer;
}

export function BreweryLocation({ brewer }: BreweryLocationProps) {
  const locationParts = [
    brewer.city,
    brewer.state?.name,
    brewer.country?.name
  ].filter(Boolean).join(', ');

  return locationParts ? (
    <HStack spacing={2} mt={2} align="center">
      <Box as="span" color="blue.500"> {/* Replace with the correct color code */}
        <Icon as={FaBeer} /> Replace with the correct icon
      </Box>
      <Text fontSize='sm' fontWeight="bold" color='red.600'> {/* Replace with the correct color code and font weight */}
        {locationParts}
      </Text>
    </HStack>
  ) : null;
}
