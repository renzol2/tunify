import React, { useState } from 'react';
import Axios from 'axios';

/**
 * Individual card for each artist on Artist page
 * @param {{ id: Number, name: String, popularity: Number, bio: String | null, deleteArtist: Function }}
 */
export default function ArtistCard({
  id,
  name,
  popularity,
  bio,
  deleteArtist,
}) {
  console.log(id);
  return (
    <div
      style={{
        width: '40%',
        paddingLeft: 'auto',
        paddingRight: 'auto',
        paddingBottom: 10,
        margin: 5,
        borderStyle: 'solid',
        borderWidth: 0.2,
        borderColor: 'black',
        borderRadius: 30,
      }}
    >
      <h4>
        {name} (ID: {id})
      </h4>
      <p>Popularity: {popularity.toFixed(2)}</p>
      <button
        onClick={() => deleteArtist(id)}
        style={{ backgroundColor: 'darkred', color: 'white' }}
      >
        Delete this artist
      </button>
    </div>
  );
}
