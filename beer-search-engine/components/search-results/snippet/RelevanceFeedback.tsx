import { Tooltip, IconButton, Box } from "@chakra-ui/react";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";

interface RelevanceFeedbackProps {
  onRelevant: () => void;
  onIrrelevant: () => void;
}

export default function RelevanceFeedback({
  onRelevant,
  onIrrelevant,
}: RelevanceFeedbackProps) {
  return (
    <Box>
      <Tooltip label='Mark as relevant' hasArrow>
        <IconButton
          aria-label='Relevant'
          icon={<FiThumbsUp />}
          variant='ghost'
          colorScheme='green'
          size='sm'
          onClick={onRelevant}
        />
      </Tooltip>
      <Tooltip label='Mark as irrelevant' hasArrow>
        <IconButton
          aria-label='Irrelevant'
          icon={<FiThumbsDown />}
          variant='ghost'
          colorScheme='red'
          size='sm'
          onClick={onIrrelevant}
        />
      </Tooltip>
    </Box>
  )
}