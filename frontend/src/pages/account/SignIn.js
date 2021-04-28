import React from 'react';
import { Box, Center, Input, VStack } from '@chakra-ui/react';

export default function SignIn() {
  return (
    <Box w="100%">
      <Center w="100%">
        <VStack bgColor="pink.100" p="10%">
          <Input placeholder="Name" />
        </VStack>
      </Center>
    </Box>
  )
}