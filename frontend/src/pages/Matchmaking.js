import React, { useState } from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import Client from '../api/Client';
import useUserInfo from '../hooks/useUserInfo';
import Footer from '../components/Footer';

export default function Matchmaking() {
  const LIMIT = 50;
  const [userInfo] = useUserInfo();
  const [matchesByArtist, setMatchesByArtist] = useState([]);
  const [matchesBySong, setMatchesBySong] = useState([]);
  const [matchesByGenre, setMatchesByGenre] = useState([]);

  function runQuery(queryType, userId) {
    Client.get(`matchmaking/${queryType}/${LIMIT}/${userId}`).then(
      (response) => {
        if (queryType === 'UserArtist') {
          setMatchesByArtist(response.data);
        } else if (queryType === 'UserSong') {
          setMatchesBySong(response.data);
        } else if (queryType === 'UserGenre') {
          setMatchesByGenre(response.data);
        }
      }
    );
    console.log(matchesByArtist);
    console.log(matchesBySong);
    console.log(matchesByGenre);
  }

  return (
    <>
      <Box w="100%" px="5%" pt="2%" mb={2}>
        <Heading as="h3" fontWeight="extrabold" fontSize="5xl" my={3}>
          Your Mutual Likes
        </Heading>
      </Box>

      <Box w="100%" py="5%" bgGradient="linear(to-l, #7928CA, #FF0080)">
        {/* TODO: put mutual likes here */}
      </Box>

      <Box w="100%" px="5%" pt="2%" mb="5%">
        <Heading as="h3" fontWeight="extrabold" fontSize="4xl" my={3}>
          Search for people with similar music taste!
        </Heading>
        {/* TODO: search bar */}

        <Heading as="h4" fontWeight="extrabold" fontSize="3xl" mb={3} mt="5%">
          You've liked the same artists as:
        </Heading>
        {/* TODO: matches by artist */}

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
