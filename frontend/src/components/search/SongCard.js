import React, { useState } from 'react';
import { Box, Center, Flex, Text } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/button';
import { AddIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/toast';
import Client from '../../api/Client';
import sendErrorToast from '../../hooks/sendErrorToast';
import { Fade } from '@chakra-ui/transition';

/**
 * @param {{ song: {
 *   song_id: Number,
 *   name: String,
 *   duration: Number,
 *   date: String
 * }, userId: Number, isLiked: Boolean }}
 */
export default function SongCard({ song, userId, isLiked = false }) {
  const toast = useToast();
  const [liked, setLiked] = useState(isLiked);
  const [isLoading, setLoading] = useState(false);

  /**
   * Callback for user clicking the like button
   */
  function onLike() {
    setLoading(true); // Start loading (disable button)
    if (liked) {
      // If the user clicks a liked song, unlike the song
      // Delete row in UserSong
      Client.delete(
        `/user_song?userIdQuery=${userId}&songIdQuery=${song.song_id}`
      )
        .then((res) => {
          // Set button to unliked, loading false
          setLiked(false);
          setLoading(false);

          // Send success toast
          toast({
            title: 'song removed',
            description: `${song.name} has been removed from your likes.`,
            status: 'info',
            isClosable: true,
          });
        })
        .catch((error) => {
          setLoading(false);
          sendErrorToast();
        });
    } else {
      // If the user clicks an unliked song, like the song
      // Create row in UserArtist
      Client.post(`/user_song`, {
        user_id: userId,
        song_id: song.song_id,
      })
        .then((res) => {
          // Set button to be liked, loading false
          setLiked(true);
          setLoading(false);

          // Send toast
          toast({
            title: 'Song added',
            description: `${song.name} has been added to your likes.`,
            status: 'success',
            isClosable: true,
          });
        })
        .catch((error) => {
          setLoading(false);
          sendErrorToast();
        });
    }
  }

  return (
    <Fade in>
      <Center
        verticalAlign
        bgColor="gray.100"
        p={3}
        rounded={30}
        boxShadow="lg"
      >
        <Flex justifyContent="space-between" alignItems="center" w="100%">
          <Box ml={3}>
            <Text fontWeight="black">{song.name}</Text>
            <Text fontWeight="hairline">
              {(song.duration / 1000 / 60).toFixed(2)} minutes
            </Text>
          </Box>
          <IconButton
            onClick={onLike}
            icon={liked ? <CheckCircleIcon /> : <AddIcon />}
            disabled={isLoading}
          />
        </Flex>
      </Center>
    </Fade>
  );
}
