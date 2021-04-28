import React from 'react';
import { Box, Heading, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

export default function SearchMusic() {
  return (
    <Box w="100%" p="5%">
      <Heading as="h3" fontWeight="extrabold" fontSize="4xl" my={3}>
        Search for your favorite songs, genres, and artists.
      </Heading>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
        <Input variant="filled" placeholder="Search"  />
      </InputGroup>
    </Box>
  );
}
