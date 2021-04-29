import React, { useState, useEffect } from 'react';
import {
  Box,
  Divider,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Client from '../api/Client';
import Footer from '../components/Footer';
import ArtistCard from '../components/search/ArtistCard';
import GenreCard from '../components/search/GenreCard';
import SongCard from '../components/search/SongCard';
import useUserInfo from '../hooks/useUserInfo';

export default function SearchMusic() {
  const LIMIT = 50; // FIXME: make limit changeable
  const [userInfo] = useUserInfo();
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [artists, setArtists] = useState([]);
  // A dictionary to access artist ids in constant O(1) time
  const [likedArtists, setLikedArtists] = useState(null);
  const [genres, setGenres] = useState([]);
  const [songs, setSongs] = useState([]);
  const [isInitial, setInitial] = useState(true);

  useEffect(() => {
    if (userInfo !== null) {
      Client.get(`user_artist/all?userIdQuery=${userInfo.user_id}`).then(
        (res) => {
          initializeLikedArtists(res.data);
        }
      );
    }
  }, [userInfo, artists]);

  /**
   * Adds liked artist ids to state dictionary
   * @param {Array} responseData array of UserArtist pairings
   */
  function initializeLikedArtists(responseData) {
    const likedArtistsDict = {};
    for (let { artist_id } of responseData) {
      likedArtistsDict[artist_id] = true;
    }
    setLikedArtists(likedArtistsDict);
  }

  /**
   * Fetches search results into state
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  function getSearchResults(e) {
    setInitial(false);
    e.preventDefault();

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

        <Heading as="h4" fontWeight="extrabold" fontSize="3xl" mb={3} mt="5%">
          Artists{' '}
          {!isInitial && (
            <Text fontWeight="light" fontSize="lg">
              {artists.length} results found.
            </Text>
          )}
        </Heading>
        <Divider my={2} />
        {isLoading && <Spinner />}
        {isInitial && <Text>Search to find your favorite artists!</Text>}
        {!isInitial && artists.length === 0 && <Text>No artists found.</Text>}
        <SimpleGrid columns={3} spacing={5}>
          {artists.map((artist) => (
            <ArtistCard
              key={artist.artist_id}
              artist={artist}
              userId={userInfo.user_id}
              isLiked={Boolean(likedArtists[artist.artist_id])}
            />
          ))}
        </SimpleGrid>

        <Heading as="h4" fontWeight="extrabold" fontSize="3xl" mb={3} mt="5%">
          Genres
          {!isInitial && (
            <Text fontWeight="light" fontSize="lg">
              {genres.length} results found.
            </Text>
          )}
        </Heading>
        <Divider my={2} />
        {isLoading && <Spinner />}
        {isInitial && <Text>Search to find your favorite genres!</Text>}
        {!isInitial && genres.length === 0 && <Text>No genres found.</Text>}
        <SimpleGrid columns={3} spacing={5}>
          {genres.map((genre) => (
            <GenreCard key={genre.genre_id} genre={genre} />
          ))}
        </SimpleGrid>

        <Heading as="h4" fontWeight="extrabold" fontSize="3xl" mb={3} mt="5%">
          Songs
          {!isInitial && (
            <Text fontWeight="light" fontSize="lg">
              {songs.length} results found.
            </Text>
          )}
        </Heading>
        <Divider my={2} />
        {isLoading && <Spinner />}
        {isInitial && <Text>Search to find your favorite songs!</Text>}
        {!isInitial && songs.length === 0 && <Text>No songs found.</Text>}
        <SimpleGrid columns={3} spacing={5}>
          {songs.map((song) => (
            <SongCard key={song.song_id} song={song} />
          ))}
        </SimpleGrid>
      </Box>
      <Footer />
    </>
  );
}
