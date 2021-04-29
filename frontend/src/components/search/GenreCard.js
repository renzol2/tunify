import { IconButton } from '@chakra-ui/button';
import { Center, Flex, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { AddIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/toast';
import Client from '../../api/Client';
import sendErrorToast from '../../hooks/sendErrorToast';

/**
 * @param {{ genre: {
 *   genre_id: Number,
 *   name: String
 * }}}
 * @returns
 */
export default function GenreCard({ genre, userId, isLiked = false }) {
  const toast = useToast();
  const [liked, setLiked] = useState(isLiked);
  const [isLoading, setLoading] = useState(false);

  /**
   * Callback for user clicking the like button
   */
   function onLike() {
    setLoading(true);  // Start loading (disable button)
    if (liked) {
      // If the user clicks a liked genre, unlike the genre
      // Delete row in UserGenre
      Client.delete(
        `/user_genre?userIdQuery=${userId}&genreIdQuery=${genre.genre_id}`
      )
        .then((res) => {
          // Set button to unliked, loading false
          setLiked(false);
          setLoading(false);

          // Send success toast
          toast({
            title: 'Genre removed',
            description: `${genre.name} has been removed from your likes.`,
            status: 'info',
            isClosable: true
          });
        })
        .catch((error) => {
          setLoading(false);
          sendErrorToast();
        });
    } else {
      // If the user clicks an unliked genre, like the genre
      // Create row in UserArtist
      Client.post(`/user_genre`, {
        user_id: userId,
        genre_id: genre.genre_id,
      })
        .then((res) => {
          // Set button to be liked, loading false
          setLiked(true);
          setLoading(false);

          // Send toast
          toast({
            title: 'Genre added',
            description: `${genre.name} has been added to your likes.`,
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

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <Center verticalAlign bgColor="gray.100" p={3} rounded={30} boxShadow="lg">
      <Flex justifyContent="space-between" alignItems="center" w="100%">
        <Text fontWeight="black" ml={3}>
          {capitalize(genre.name)}
        </Text>
        <IconButton
          onClick={onLike}
          icon={liked ? <CheckCircleIcon /> : <AddIcon />}
          disabled={isLoading}
        />
      </Flex>
    </Center>
  );
}
