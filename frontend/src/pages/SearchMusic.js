import React, { useState } from 'react';
import {
  Box,
  Divider,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Client from '../api/Client';
import Footer from '../components/Footer';

export default function SearchMusic() {
  const LIMIT = 50; // FIXME: make limit changeable
  const [isLoading, setLoading] = useState(false);
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

    setLoading(true);

    Promise.all([
      Client.get(`artists/${LIMIT}?q=${query.replace(' ', '%20')}`),
      Client.get(`genres/${LIMIT}?q=${query.replace(' ', '%20')}`),
      Client.get(`songs/${LIMIT}?q=${query.replace(' ', '%20')}`),
    ]).then((values) => {
      setArtists(values[0].data);
      setGenres(values[1].data);
      setSongs(values[2].data);
      setLoading(false);
    });
  }

  return (
    <>
      <Box w="100%" px="5%" pt="2%" mb="5%">
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

        <Heading as="h4" fontWeight="extrabold" fontSize="3xl" mb={3} mt="2%">
          Artists
        </Heading>
        <Divider my={2} />
        <SimpleGrid columns={3} spacing={5}>
          {artists.map((artist) => (
            <Text key={artist.artist_id}>{artist.name}</Text>
          ))}
        </SimpleGrid>

        <Heading as="h4" fontWeight="extrabold" fontSize="3xl" mb={3} mt="2%">
          Genres
        </Heading>
        <Divider my={2} />
        <SimpleGrid columns={3} spacing={5}>
          {genres.map((genre) => (
            <Text key={genre.genre_id}>{genre.name}</Text>
          ))}
        </SimpleGrid>

        <Heading as="h4" fontWeight="extrabold" fontSize="3xl" mb={3} mt="2%">
          Songs
        </Heading>
        <Divider my={2} />
        <SimpleGrid columns={3} spacing={5}>
          {songs.map((song) => (
            <Text key={song.song_id}>{song.name}</Text>
          ))}
        </SimpleGrid>
      </Box>
      <Footer />
    </>
  );
}
