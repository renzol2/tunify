import React from 'react';
import { Box, Button, Center, Heading, VStack } from '@chakra-ui/react';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <Box w="100%">
      {/* Hero */}
      <Center minH="75vh" w="100%" bgGradient="linear(to-l, #7928CA, #FF0080)">
        <VStack spacing={10}>
          <Heading as="h2" fontSize="6xl" color="white" fontWeight="black">
            Find your match through the music you love.
          </Heading>
          <Heading
            as="h3"
            fontSize="2xl"
            color="white"
            fontWeight="light"
          >
            Get started with <strong>Tunify</strong> today.
          </Heading>
          <Button bgColor="pink.200" size="lg" minW="10vw">
            Sign up
          </Button>
        </VStack>
      </Center>

      {/* TODO: add more stuff here? not necessary though */}

      {/* Footer */}
      <Footer />
    </Box>
  );
}
