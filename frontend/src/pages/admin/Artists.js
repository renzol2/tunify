import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import ArtistCard from '../../components/admin/ArtistCard';

export default function Artists() {
  const [artistList, setArtistList] = useState([]);
  const [nameQuery, setNameQuery] = useState('');
  const [artistName, setArtistName] = useState('');
  const [artistPopularity, setArtistPopularity] = useState(0);
  const searchFormRef = useRef(null);
  const newArtistFormRef = useRef(null);
  const limit = 50;
  const ARTIST_ENDPOINT = 'http://localhost:3002/api/artists';

  function fetchArtists() {
    Axios.get(
      `${ARTIST_ENDPOINT}/${limit}?q=${nameQuery.replace(' ', '%20')}`
    ).then((response) => {
      setArtistList(response.data);
    });
  }

  function submitNewArtist() {
    Axios.post(`${ARTIST_ENDPOINT}`, {
      name: artistName,
      popularity: artistPopularity,
    }).then((response) => {
      fetchArtists();
      newArtistFormRef.current.reset();
    });
  }

  function deleteArtist(artistId) {
    Axios.delete(`${ARTIST_ENDPOINT}/${artistId}`).then(fetchArtists);
  }

  useEffect(() => {
    Axios.get(`${ARTIST_ENDPOINT}/${limit}`).then((response) => {
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
      <h2>Artists</h2>

      <h3>Add new artist</h3>
      <form
        ref={newArtistFormRef}
        onSubmit={(e) => {
          e.preventDefault();
          submitNewArtist();
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <label style={{ margin: 10 }}>Artist name</label>
          <input type="text" onChange={(e) => setArtistName(e.target.value)} />
          <label style={{ margin: 10 }}>Artist popularity</label>
          <input
            type="number"
            onChange={(e) => setArtistPopularity(e.target.value)}
          />
        </div>
        <input type="submit" style={{ margin: 10 }} />
      </form>

      {/* Search bar */}
      <h3>Search artists</h3>
      <form
        ref={searchFormRef}
        onSubmit={(e) => {
          e.preventDefault();
          fetchArtists();
          searchFormRef.current.reset();
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
          <ArtistCard
            key={artist.artist_id}
            id={artist.artist_id}
            name={artist.name}
            popularity={artist.popularity}
            bio={artist.bio}
            deleteArtist={deleteArtist}
            fetchArtists={fetchArtists}
          />
        ))}
      </div>
    </div>
  );
}
