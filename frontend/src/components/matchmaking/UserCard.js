import React, { useState } from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Box, Flex, HStack, Text } from '@chakra-ui/layout';
import { Fade } from '@chakra-ui/transition';
import { DEFAULT_GRADIENT, getRandomPurple } from '../../constants/colors';
import { Button, IconButton } from '@chakra-ui/button';
import { AddIcon, CheckCircleIcon } from '@chakra-ui/icons';
import Client from '../../api/Client';
import { useToast } from '@chakra-ui/toast';
import sendErrorToast from '../../hooks/sendErrorToast';
import UserModal from './UserModal';
import { useDisclosure } from '@chakra-ui/hooks';

/**
 * @param {{
 * user: {
 *     first_name: String,
 *     last_name: String,
 *     user_id: Number,
 *     email: String,
 *     dob: String | null
 *   },
 * numSimilar: Number,
 * isLiked: Boolean,
 * category: String,
 * currentUserId: Number
 * }}
 */
export default function UserCard({
  user,
  numSimilar,
  isLiked = false,
  category,
  currentUserId,
}) {
  const toast = useToast();
  const [purples] = useState([getRandomPurple(), getRandomPurple()]);
  const [liked, setLiked] = useState(isLiked);
  const [isLoading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const name = `${user.first_name} ${user.last_name}`;

  /**
   * Callback for user clicking the like button
   */
  function onLike() {
    setLoading(true); // Start loading (disable button)
    if (liked) {
      // If the user clicks a liked user, unlike the user
      // Delete row in UserArtist
      Client.delete(`/matchmaking/user_user`, {
        userId1: currentUserId,
        userId2: user.user_id,
      })
        .then((res) => {
          // Set button to unliked, loading false
          setLiked(false);
          setLoading(false);

          // Send success toast
          toast({
            title: 'User removed',
            description: `${name} has been removed from your likes.`,
            status: 'info',
            isClosable: true,
          });
        })
        .catch((error) => {
          setLoading(false);
          sendErrorToast();
        });
    } else {
      // If the user clicks an unliked user, like the user
      // Create row in UserUser
      Client.post(`/matchmaking/user_user`, {
        userId1: currentUserId,
        userId2: user.user_id,
      })
        .then((res) => {
          // Set button to be liked, loading false
          setLiked(true);
          setLoading(false);

          // Send toast
          toast({
            title: 'User added',
            description: `${name} has been added to your likes.`,
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
    <>
      <Fade in>
        <Box bgColor="gray.100" p={3} rounded={30} boxShadow="lg">
          <HStack spacing={2} w="100%" align="stretch">
            <Avatar
              name={name}
              size="md"
              bgGradient={`linear(to-l, ${purples[0]}, ${purples[1]})`}
            />
            <Box w="100%">
              <HStack w="100%" spacing={4}>
                <Text textAlign="left" fontWeight="black" fontSize="lg">
                  {name}
                </Text>
                <Text textAlign="right" fontWeight="hairline">
                  {user.email}
                </Text>
              </HStack>

              <Text fontWeight="normal" mt={2}>
                {numSimilar} {category}
                {numSimilar === 1 ? '' : 's'} in common
              </Text>
            </Box>
            <IconButton
              onClick={onLike}
              icon={liked ? <CheckCircleIcon /> : <AddIcon />}
              mt={3}
              disabled={isLoading}
            />
          </HStack>
          <Flex
            flexDirection="row-reverse"
            justifyContent="space-between"
            alignItems="stretch"
          >
            <Button
              size="xs"
              bgGradient={DEFAULT_GRADIENT}
              color="whitesmoke"
              _hover={{
                opacity: 0.5,
              }}
              onClick={onOpen}
            >
              Compare likes
            </Button>
          </Flex>
        </Box>
      </Fade>

      {isOpen && <UserModal user={user} isOpen={isOpen} onClose={onClose} />}
    </>
  );
}
