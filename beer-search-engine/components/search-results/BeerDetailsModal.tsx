import { Beer } from "@/service/beer-service"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  HStack,
  Icon,
  Text,
  VStack,
  Textarea,
} from "@chakra-ui/react"
import { IconType } from "react-icons"
import { FiBox, FiDollarSign, FiInfo } from "react-icons/fi"

interface BeerDetailsModalProps {
  beer: Beer
  isOpen: boolean
  onClose: () => void
}

function ItemWithIcon({
  icon,
  children,
}: {
  icon: IconType
  children: string | string[]
}) {
  return (
    <HStack spacing={2}>
      <Icon as={icon} />
      <Text fontSize="sm" fontWeight="bold">
        {children}
      </Text>
    </HStack>
  )
}

export default function BeerDetailsModal({
  beer,
  isOpen,
  onClose,
}: BeerDetailsModalProps) {
  const price =
    beer.price?.amount && beer.price?.currency
      ? `${beer.price?.amount} ${beer.price?.currency}`
      : "Unknown"
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{beer?.name || "Details"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={2} mb={2} justify={"flex-start"} alignItems={"left"}>
            <ItemWithIcon icon={FiInfo}>
              Style: {beer?.style || "Unknown"}
            </ItemWithIcon>
            <ItemWithIcon icon={FiBox}>
              Packaging: {beer?.packaging || "Unknown"}
            </ItemWithIcon>
            <ItemWithIcon icon={FiBox}>
              Closure: {beer?.closure || "Unknown"}
            </ItemWithIcon>
            <ItemWithIcon icon={FiDollarSign}>Price: {price}</ItemWithIcon>
            {/* Text area for description */}
            <Text fontSize="sm" fontWeight="bold">
              Description:
            </Text>
            <Textarea value={beer?.description || "Unknown"} minH={100} />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
