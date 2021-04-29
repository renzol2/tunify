import { Text } from '@chakra-ui/layout';
import React from 'react';

/**
 * @param {{ song: {
 *   song_id: Number,
 *   name: String,
 *   duration: Number,
 *   date: String
 * }}}  
 */
export default function SongCard({ song }) {
  return (
    <Text>{song.name}</Text>
  )
}