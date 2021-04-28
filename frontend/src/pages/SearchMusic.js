import React, { useState } from 'react';
import {
  Box,
  Divider,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Client from '../api/Client';

export default function SearchMusic() {
  const LIMIT = 50; // FIXME: make limit changeable
  const [query, setQuery] = useState('');
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [songs, setSongs] = useState([]);

  /**
   * Fetches search results into state
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  function getSearchResults(e) {
    e.preventDefault();
    console.log(e);

    Client.get(`genres/${LIMIT}?q=${query.replace(' ', '%20')}`).then((res) => {
      setGenres(res.data);
    });
  }

  return (
    <Box w="100%" p="5%">
      <Heading as="h3" fontWeight="extrabold" fontSize="4xl" my={3}>
        Search for your favorite songs, genres, and artists.
      </Heading>
      <form onSubmit={getSearchResults}>
        <InputGroup colorScheme="pink">
          <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
          <Input
            variant="filled"
            placeholder="Search"
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
          {/* TODO: add input right element to clear? */}
        </InputGroup>
      </form>

      <Divider my="2%" />

      {genres.map((genre) => (
        <Text key={genre.genre_id}>
          {genre.name}
        </Text>
      ))}
    </Box>
  );
}
