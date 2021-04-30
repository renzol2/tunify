import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import Client from '../api/Client';
import useUserInfo from '../hooks/useUserInfo';
import Footer from '../components/Footer';
import sendErrorToast from '../hooks/sendErrorToast';
import UserCard from '../components/matchmaking/UserCard';

export default function Matchmaking() {
  const LIMIT = 50;
  const [userInfo] = useUserInfo();
  const [matchesByArtist, setMatchesByArtist] = useState([]);
  const [matchesByGenre, setMatchesByGenre] = useState([]);
  const [matchesBySong, setMatchesBySong] = useState([]);
  const [mutualLikes, setMutualLikes] = useState([]);

  useEffect(() => {
    if (userInfo === null) return;

    Promise.all([
      Client.get(`matchmaking/UserArtist/${LIMIT}/${userInfo.user_id}`),
      Client.get(`matchmaking/UserGenre/${LIMIT}/${userInfo.user_id}`),
      Client.get(`matchmaking/UserSong/${LIMIT}/${userInfo.user_id}`),
    ])
      .then((values) => {
        setMatchesByArtist(values[0].data);
        setMatchesByGenre(values[1].data);
        setMatchesBySong(values[2].data);
      })
      .catch((e) => sendErrorToast());
  }, [userInfo]);

  return (
    <>
      <Box w="100%" px="5%" pt="2%" mb={2}>
        <Heading as="h3" fontWeight="extrabold" fontSize="5xl" my={3}>
          Your Mutual Likes
        </Heading>
      </Box>

      <Box w="100%" p="5%" bgGradient="linear(to-l, #7928CA, #FF0080)">
        {/* TODO: put mutual likes here */}
        {mutualLikes.length === 0 && (
          <Text color="white" fontWeight="hairline" fontSize="lg">
            No one's liked you back yet ... :(
          </Text>
        )}
      </Box>

      <Box w="100%" px="5%" pt="2%" mb="5%">
        {/* TODO: search bar */}
        <Button
          onClick={() => {
            console.log(matchesByArtist);
            console.log(matchesByGenre);
            console.log(matchesBySong);
          }}
        >
          Log matches
        </Button>

        <Heading as="h4" fontWeight="extrabold" fontSize="3xl" mb={3} mt="5%">
          You've liked the same artists as:
        </Heading>
        {/* TODO: matches by artist */}
        <SimpleGrid columns={3} spacing={5}>
          {matchesByArtist.map((user) => (
            <UserCard
              key={user.user_id}
              user={user}
              isLiked={false}
              numSimilar={user.num_similar_artists}
              category="artist"
            />
          ))}
        </SimpleGrid>

        <Heading as="h4" fontWeight="extrabold" fontSize="3xl" mb={3} mt="5%">
          You've liked the same genres as:
        </Heading>
        {/* TODO: matches by genre */}

        <Heading as="h4" fontWeight="extrabold" fontSize="3xl" mb={3} mt="5%">
          You've liked the same songs as:
        </Heading>
        {/* TODO: matches by song */}
      </Box>
      <Footer />
    </>
  );
}
