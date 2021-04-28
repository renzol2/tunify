import { Center, Heading } from '@chakra-ui/layout';
import React from 'react';

export default function Footer() {
  return (
    <Center minH="30vh" bgColor="black">
      <Heading as="h3" fontSize="xl" fontWeight="100" color="gray">
        © 2021 Tunify
      </Heading>
    </Center>
  )
}