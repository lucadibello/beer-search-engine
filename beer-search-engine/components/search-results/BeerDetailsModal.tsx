import { Beer } from "@/service/beer-service"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  UnorderedList,
  ListItem,
  ModalFooter,
  Button,
} from "@chakra-ui/react"

interface BeerDetailsModalProps {
  beer: Beer
  isOpen: boolean
  onClose: () => void
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{beer?.name || "Details"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <UnorderedList>
            <ListItem>Style: {beer?.style || "Unknown"}</ListItem>
            <ListItem>Packaging: {beer?.packaging || "Unknown"}</ListItem>
            <ListItem>Closure: {beer?.closure || "Unknown"}</ListItem>
            <ListItem>Price: {price}</ListItem>
          </UnorderedList>
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
