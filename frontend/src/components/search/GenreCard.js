import { IconButton } from '@chakra-ui/button';
import { Center, Flex, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { AddIcon, CheckCircleIcon } from '@chakra-ui/icons';

/**
 * @param {{ genre: {
 *   genre_id: Number,
 *   name: String
 * }}}
 * @returns
 */
export default function GenreCard({ genre }) {
  const [liked, setLiked] = useState(false);

  function onLike() {
    setLiked(!liked);
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
        />
      </Flex>
    </Center>
  );
}
