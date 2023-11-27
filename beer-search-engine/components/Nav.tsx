'use client'

import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Icon,
} from '@chakra-ui/react'
import { FiMoon, FiSun } from 'react-icons/fi'

interface Props {
  children: React.ReactNode
}

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>Logo</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <Icon as={FiMoon} /> : <Icon as={FiSun} />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}