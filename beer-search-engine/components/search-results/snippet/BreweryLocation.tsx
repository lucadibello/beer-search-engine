import { Brewer } from "@/service/beer-service";
import { HStack, Box, Text } from "@chakra-ui/react";

export interface BreweryLocationProps {
  brewer: Brewer;
}

// Function to convert country codes to Unicode flag emojis
const countryCodeToFlagEmoji = (countryCode: string): string => {
  const codePoints = countryCode.toUpperCase().split('').map(char =>
    127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function BreweryLocation({ brewer }: BreweryLocationProps) {
  const locationParts = [
    brewer.city,
    brewer.state?.name,
    brewer.country?.name
  ].filter(Boolean).join(', ');

  const flagEmoji = brewer.country?.code ? countryCodeToFlagEmoji(brewer.country.code) : '';

  return locationParts ? (
    <HStack spacing={2} mt={2} align="center">
      <Box as="span">
        {flagEmoji}
      </Box>
      <Text fontSize='sm' fontWeight="bold"> {/* Replace with the correct color code and font weight */}
        {locationParts}
      </Text>
    </HStack>
  ) : null;
}