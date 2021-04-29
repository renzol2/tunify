import React, { useState } from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { IconButton } from '@chakra-ui/button';
import { AddIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { Box, HStack, Text, VStack } from '@chakra-ui/layout';
import { getRandomPurple } from '../../constants/colors';
import { useToast } from '@chakra-ui/toast';
import Client from '../../api/Client';

/**
 * @param {{ artist: {
 *   artist_id: Number,
 *   name: String
 *   popularity: Number,
 *   bio: String | null
 * }, liked: Boolean }}
 */
export default function ArtistCard({ artist, userId, isLiked = false }) {
  const toast = useToast();
  const [liked, setLiked] = useState(isLiked);
  const [isLoading, setLoading] = useState(false);
  const [purples] = useState([getRandomPurple(), getRandomPurple()]);

  function sendErrorToast() {
    toast({
      title: 'Error',
      description: 'An error occurred. Please refresh the page.',
      status: 'error',
      isClosable: true
    });
  }

  /**
   * Callback for user clicking the like button
   */
  function onLike() {
    setLoading(true);  // Start loading (disable button)
    if (liked) {
      // If the user clicks a liked artist, unlike the artist
      // Delete row in UserArtist
      Client.delete(
        `/user_artist?userIdQuery=${userId}&artistIdQuery=${artist.artist_id}`
      )
        .then((res) => {
          // Set button to unliked, loading false
          setLiked(false);
          setLoading(false);

          // Send success toast
          toast({
            title: 'Artist removed',
            description: `${artist.name} has been removed from your likes.`,
            status: 'info',
            isClosable: true
          });
        })
        .catch((error) => {
          setLoading(false);
          sendErrorToast();
        });
    } else {
      // If the user clicks an unliked artist, like the artist
      // Create row in UserArtist
      Client.post(`/user_artist`, {
        user_id: userId,
        artist_id: artist.artist_id,
      })
        .then((res) => {
          // Set button to be liked, loading false
          setLiked(true);
          setLoading(false);

          // Send toast
          toast({
            title: 'Artist added',
            description: `${artist.name} has been added to your likes.`,
            status: 'success',
            isClosable: true
          });
        })
        .catch((error) => {
          setLoading(false);
          sendErrorToast();
        });
    }
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
          disabled={isLoading}
        />
      </HStack>
    </Box>
  );
}
