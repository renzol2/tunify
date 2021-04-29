import { Text } from '@chakra-ui/layout';
import React from 'react';

/**
 * @param {{ genre: {
 *   genre_id: Number,
 *   name: String
 * }}}  
 * @returns 
 */
export default function GenreCard({ genre }) {
  return (
    <Text>{genre.name}</Text>
  )
}