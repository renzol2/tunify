import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';

export default function Artists() {
  const [artistList, setArtistList] = useState([]);
  const [nameQuery, setNameQuery] = useState('');
  const formRef = useRef(null);

  function fetchArtists() {
    Axios.get(
      `http://localhost:3002/api/artists/15?q=${nameQuery.replace(' ', '%20')}`
    ).then((response) => {
      setArtistList(response.data);
    });
  }

  useEffect(() => {
    Axios.get(
      `http://localhost:3002/api/artists/15`
    ).then((response) => {
      setArtistList(response.data);
    });
  }, []);

  return (
    // Container
    <div
      style={{
        width: '100%',
        textAlign: 'center',
      }}
    >
      <h2>Artist List</h2>

      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          fetchArtists();
          formRef.current.reset();
        }}
      >
        <label style={{ padding: 10 }}>Search artist by name</label>
        <input
          type="text"
          id="search-name-input"
          onChange={(e) => setNameQuery(e.target.value)}
        />
        <input type="submit" />
      </form>

      {/* Artist list container */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {artistList.map((artist) => (
          // Artist individual component
          <div
            key={artist.artist_id}
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
              {artist.name} (ID: {artist.artist_id})
            </h4>
            <p>Popularity: {artist.popularity.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
