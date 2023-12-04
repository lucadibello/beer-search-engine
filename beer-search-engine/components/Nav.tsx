'use client';

import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Icon,
  Heading,
} from '@chakra-ui/react'
import Link from 'next/link';
import { FiMoon, FiSun } from 'react-icons/fi'

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Heading
            size='md'
            transition='all 0.2s ease-in-out'
            _hover={{
              cursor: 'pointer',
              letterSpacing: '1px',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <Link href='/' about='Home page'>
              Beer Search Engine
            </Link>
          </Heading>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button
                onClick={toggleColorMode}
                size='sm'
                variant='ghost'
              >
                {colorMode === 'light' ? <Icon as={FiMoon} /> : <Icon as={FiSun} />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box >
    </>
  )
}