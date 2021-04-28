import React from 'react';
import { Box, Button, Center, Heading, VStack } from '@chakra-ui/react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Box w="100%">
      {/* Hero */}
      <Center minH="75vh" w="100%" bgGradient="linear(to-l, #7928CA, #FF0080)">
        <VStack spacing={10}>
          {/* Title */}
          <Heading
            as="h2"
            fontSize="6xl"
            color="white"
            fontWeight="black"
            textShadow="4px 4px #000000"
          >
            Find your match through the music you love.
          </Heading>

          {/* Subtitle */}
          <Heading as="h3" fontSize="2xl" color="white" fontWeight="light">
            Get started with <strong>Tunify</strong> today.
          </Heading>

          {/* Sign up button */}
          <Link to="/sign-up">
            <Button bgColor="pink.200" size="lg" minW="10vw">
              Sign up
            </Button>
          </Link>
        </VStack>
      </Center>

      {/* TODO: add more stuff here? for aesthetics lol */}

      {/* Footer */}
      <Footer />
    </Box>
  );
}
