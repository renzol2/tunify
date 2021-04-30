import React, { useEffect, useState } from 'react';
import {
  Box,
  Fade,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import Client from '../api/Client';
import useUserInfo from '../hooks/useUserInfo';
import Footer from '../components/Footer';
import sendErrorToast from '../hooks/sendErrorToast';
import UserCard from '../components/matchmaking/UserCard';
import { DEFAULT_GRADIENT } from '../constants/colors';

export default function Matchmaking() {
  const LIMIT = '50';
  const [userInfo] = useUserInfo();
  const [matchesByArtist, setMatchesByArtist] = useState([]);
  const [matchesByGenre, setMatchesByGenre] = useState([]);
  const [matchesBySong, setMatchesBySong] = useState([]);
  const [mutualLikes, setMutualLikes] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // Dictionary to access liked users in O(1) time
  const [likedUsers, setLikedUsers] = useState(null);

  useEffect(() => {
    if (userInfo === null) return;

    setLoading(true);
    Promise.all([
      // Matches by artist/genre/song
      Client.get(`matchmaking/UserArtist/${LIMIT}/${userInfo.user_id}`),
      Client.get(`matchmaking/UserGenre/${LIMIT}/${userInfo.user_id}`),
      Client.get(`matchmaking/UserSong/${LIMIT}/${userInfo.user_id}`),

      // Users liked by logged in user
      Client.get(`matchmaking/user_user/all?user1IdQuery=${userInfo.user_id}`),
    ])
      .then((values) => {
        // Initialize liked users dictionary
        const likedUsersDict = {};
        for (let { user_2_id } of values[3].data)
          likedUsersDict[user_2_id] = true;
        setLikedUsers(likedUsersDict);

        // Initialize matches
        setMatchesByArtist(values[0].data);
        setMatchesByGenre(values[1].data);
        setMatchesBySong(values[2].data);

        setLikedUsers(false);
        setLoading(false);
      })
      .catch((e) => {
        sendErrorToast();
        setLoading(false);
      });
  }, [userInfo]);

  return (
    <>
      <Box w="100%" px="5%" pt="2%" mb={2}>
        <Heading as="h3" fontWeight="extrabold" fontSize="5xl" my={3}>
          Your Mutual Likes
        </Heading>
      </Box>

      <Box w="100%" p="5%" bgGradient={DEFAULT_GRADIENT}>
        {/* TODO: put mutual likes here */}
        {isLoading && <Spinner />}
        {!isLoading && mutualLikes.length === 0 && (
          <Fade in>
            <Text color="white" fontWeight="hairline" fontSize="lg">
              No one's liked you back yet 😢
            </Text>
          </Fade>
        )}
      </Box>

      <Box w="100%" px="5%" pt="2%" mb="5%">
        {/* TODO: search bar */}

        <Heading as="h4" fontWeight="extrabold" fontSize="3xl" mb={3} mt="5%">
          You've liked the same artists as:
        </Heading>
        {isLoading && <Spinner />}
        {!isLoading && matchesByArtist.length === 0 && (
          <Text fontWeight="hairline">No one. 🤷‍♀️</Text>
        )}
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={5}>
          {matchesByArtist.map((user) => (
            <UserCard
              key={user.user_id}
              user={user}
              isLiked={Boolean(likedUsers[user.user_id])}
              numSimilar={user.num_similar_artists}
              category="artist"
              currentUserId={userInfo.user_id}
            />
          ))}
        </SimpleGrid>

        <Heading as="h4" fontWeight="extrabold" fontSize="3xl" mb={3} mt="5%">
          You've liked the same genres as:
        </Heading>
        {isLoading && <Spinner />}
        {!isLoading && matchesByGenre.length === 0 && (
          <Text fontWeight="hairline">No one. 🤷‍♀️</Text>
        )}
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={5}>
          {matchesByGenre.map((user) => (
            <UserCard
              key={user.user_id}
              user={user}
              isLiked={Boolean(likedUsers[user.user_id])}
              numSimilar={user.num_similar_genres}
              category="genre"
              currentUserId={userInfo.user_id}
            />
          ))}
        </SimpleGrid>

        <Heading as="h4" fontWeight="extrabold" fontSize="3xl" mb={3} mt="5%">
          You've liked the same songs as:
        </Heading>
        {isLoading && <Spinner />}
        {!isLoading && matchesBySong.length === 0 && (
          <Text fontWeight="hairline">No one. 🤷‍♀️</Text>
        )}
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={5}>
          {matchesBySong.map((user) => (
            <UserCard
              key={user.user_id}
              user={user}
              isLiked={Boolean(likedUsers[user.user_id])}
              numSimilar={user.num_similar_songs}
              category="song"
              currentUserId={userInfo.user_id}
            />
          ))}
        </SimpleGrid>
      </Box>
      <Footer />
    </>
  );
}
