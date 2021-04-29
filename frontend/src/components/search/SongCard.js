import React, {useState} from 'react';
import { Box, Center, Flex, Text, VStack } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/button';
import { AddIcon, CheckCircleIcon } from '@chakra-ui/icons';


/**
 * @param {{ song: {
 *   song_id: Number,
 *   name: String,
 *   duration: Number,
 *   date: String
 * }}}  
 */
export default function SongCard({ song }) {
  const [liked, setLiked] = useState(false);

  function onLike() {
    setLiked(!liked);
  }

  return (
    <Center verticalAlign bgColor="gray.100" p={3} rounded={30} boxShadow="lg">
    <Flex justifyContent="space-between" alignItems="center" w="100%">
      <Box ml={3}>
        <Text fontWeight="black">
          {song.name}
        </Text>
        <Text fontWeight="hairline">
          {(song.duration / 1000 / 60).toFixed(2)} minutes
        </Text>
      </Box>
      <IconButton
        onClick={onLike}
        icon={liked ? <CheckCircleIcon /> : <AddIcon />}
      />
    </Flex>
  </Center>
  )
}