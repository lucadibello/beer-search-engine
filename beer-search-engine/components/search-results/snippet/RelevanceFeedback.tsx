import { Tooltip, IconButton, Box } from "@chakra-ui/react"
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi"

interface RelevanceFeedbackProps {
  isRelevant: boolean
  isIrrelevant: boolean
  onRelevant: () => void
  onIrrelevant: () => void
}

export default function RelevanceFeedback({
  isRelevant,
  isIrrelevant,
  onRelevant,
  onIrrelevant,
}: RelevanceFeedbackProps) {
  return (
    <Box>
      <Tooltip label="Mark as relevant" hasArrow>
        <IconButton
          aria-label="Relevant"
          icon={<FiThumbsUp />}
          variant="ghost"
          colorScheme="green"
          size="md"
          onClick={onRelevant}
          bgColor={isRelevant ? "green.100" : undefined}
          color={isRelevant ? "green.600" : undefined}
        />
      </Tooltip>
      <Tooltip label="Mark as irrelevant" hasArrow>
        <IconButton
          aria-label="Irrelevant"
          icon={<FiThumbsDown />}
          variant="ghost"
          colorScheme="red"
          size="md"
          onClick={onIrrelevant}
          bgColor={isIrrelevant ? "red.100" : undefined}
          color={isIrrelevant ? "red.600" : undefined}
        />
      </Tooltip>
    </Box>
  )
}
