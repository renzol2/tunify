import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Artists() {
  const [artistList, setArtistList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3002/api/artists/15').then((response) => {
      setArtistList(response.data);
    });
  }, []);

  return (
    <div style={{
      width: '100%',
      textAlign: 'center'
    }}>
      <h2>Artist List</h2>
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {artistList.map((artist) => (
          <div style={{
            width: '40%',
            paddingLeft: 'auto',
            paddingRight: 'auto',
            paddingBottom: 10,
            margin: 5,
            borderStyle: 'solid',
            borderWidth: 0.2,
            borderColor: 'black',
            borderRadius: 30,
          }}>
            <h4>{artist.name}</h4>
            <p>Popularity: {artist.popularity.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
