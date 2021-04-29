import React, { useState } from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { IconButton } from '@chakra-ui/button';
import { AddIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { Box, HStack, Text, VStack } from '@chakra-ui/layout';
import { getRandomPurple } from '../../constants/colors';

/**
 * @param {{ artist: {
 *   artist_id: Number,
 *   name: String
 *   popularity: Number,
 *   bio: String | null
 * } }}
 */
export default function ArtistCard({ artist }) {
  const [liked, setLiked] = useState(false);
  const [purples,] = useState([getRandomPurple(), getRandomPurple()]);

  function onLike() {
    setLiked(!liked);
  }

  return (
    <Box bgColor="gray.100" p={3} rounded={30} boxShadow="lg">
      <HStack spacing={2} w="100%" align="stretch">
        <Avatar
          name={artist.name}
          size="md"
          bgGradient={`linear(to-l, ${purples[0]}, ${purples[1]})`}
        />
        <VStack spacing={1} w="100%">
          <Text fontWeight="black">{artist.name}</Text>
          <Text textAlign="right" fontWeight="hairline">
            Popularity: {Math.round(artist.popularity)}
          </Text>
        </VStack>
        <IconButton
          onClick={onLike}
          icon={liked ? <CheckCircleIcon /> : <AddIcon />}
          mt={3}
        />
      </HStack>
    </Box>
  );
}
