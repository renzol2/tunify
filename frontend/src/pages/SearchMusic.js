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
import sendErrorToast from '../hooks/sendErrorToast';

export default function SearchMusic() {
  const LIMIT = 50; // FIXME: make limit changeable
  const [userInfo] = useUserInfo();
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [isInitial, setInitial] = useState(true);

  // Arrays of search results
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [songs, setSongs] = useState([]);

  // Dictionaries to access liked ids in constant O(1) time
  const [likedArtists, setLikedArtists] = useState(null);
  const [likedGenres, setLikedGenres] = useState(null);
  const [likedSongs, setLikedSongs] = useState(null);

  // Fetch liked artists/songs/genres
  useEffect(() => {
    if (userInfo === null) {
      return;
    }

    // Resolve promises liked artists/songs/genres
    Promise.all([
      Client.get(`user_artist/all?userIdQuery=${userInfo.user_id}`),
      Client.get(`user_genre/all?userIdQuery=${userInfo.user_id}`),
      Client.get(`user_song/all?userIdQuery=${userInfo.user_id}`),
    ]).then((values) => {
      console.log(values);
      // Initialize likes dictionaries
      const likedArtistsDict = {};
      const likedGenresDict = {};
      const likedSongsDict = {};

      for (let { artist_id } of values[0].data)
        likedArtistsDict[artist_id] = true;
      for (let { genre_id } of values[1].data) likedGenresDict[genre_id] = true;
      for (let { song_id } of values[2].data) likedSongsDict[song_id] = true;

      setLikedArtists(likedArtistsDict);
      setLikedGenres(likedGenresDict);
      setLikedSongs(likedSongsDict);
    }).catch((e) => sendErrorToast());
  }, [userInfo, artists]);

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
    }).catch((e) => sendErrorToast());
  }

  return (
    <>
      <Box w="100%" px="5%" pt="2%" mb="5%">
        <Heading as="h3" fontWeight="extrabold" fontSize="4xl" my={3}>
          Search for your favorite songs, genres, and artists.
        </Heading>

        {/* Search bar */}
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

        {/* Artists results */}
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

        {/* Genres results */}
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
            <GenreCard
              key={genre.genre_id}
              genre={genre}
              userId={userInfo.user_id}
              isLiked={Boolean(likedGenres[genre.genre_id])}
            />
          ))}
        </SimpleGrid>

        {/* Songs results */}
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
            <SongCard
              key={song.song_id}
              song={song}
              userId={userInfo.user_id}
              isLiked={Boolean(likedSongs[song.song_id])}
            />
          ))}
        </SimpleGrid>
      </Box>
      <Footer />
    </>
  );
}
