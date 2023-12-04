import { Beer } from "@/service/beer-service";
import { Heading, Box, Text, HStack, IconButton, Icon } from "@chakra-ui/react";
import Image from "next/image";
import { FiX } from "react-icons/fi";

interface BeerDetailsProps {
  beer: Beer;
  onClose: () => void;
}

export default function BeerDetails({ beer }: BeerDetailsProps) {
  return (
    <Box
      w='100%'
      // Hide on smaller screens
      display={{ base: 'none', md: 'block' }}
    >
      <HStack justifyContent={"space-between"}>
        <Heading size='md'>Details</Heading>
        <IconButton aria-label="Close" icon={<Icon as={FiX} />} />
      </HStack>
      <Box>
        <Image
          src={beer.image_url}
          width={200}
          height={200}
          alt={`${beer.name} image`}
        />

        <img src={beer.image_url} alt={`${beer.name} image`} />

        <Heading size='md'>{beer.name}</Heading>
        <Text fontSize='sm' color='gray.500'>
          {beer.style}
        </Text>
        <Text fontSize='sm' color='gray.500'>
          {beer.description}
        </Text>
      </Box>
    </Box>
  )
}