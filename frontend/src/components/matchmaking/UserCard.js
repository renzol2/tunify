import React, { useState } from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Box, HStack, Text, VStack } from '@chakra-ui/layout';
import { Fade } from '@chakra-ui/transition';
import { getRandomPurple } from '../../constants/colors';
import { IconButton } from '@chakra-ui/button';
import { AddIcon, CheckCircleIcon } from '@chakra-ui/icons';

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
 * category: String
 * }}
 */
export default function UserCard({
  user,
  numSimilar,
  isLiked = false,
  category,
}) {
  const [purples] = useState([getRandomPurple(), getRandomPurple()]);
  const [liked, setLiked] = useState(isLiked);
  const [isLoading, setLoading] = useState(false);

  function onLike() {}

  const name = `${user.first_name} ${user.last_name}`;
  return (
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
              {numSimilar} {category}{numSimilar === 1 ? '' : 's'} in common
            </Text>
          </Box>
          <IconButton
            onClick={onLike}
            icon={liked ? <CheckCircleIcon /> : <AddIcon />}
            mt={3}
            disabled={isLoading}
          />
        </HStack>
      </Box>
    </Fade>
  );
}
