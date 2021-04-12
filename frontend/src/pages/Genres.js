import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import GenreCard from '../components/GenreCard';

export default function Genres() {
  const [genreList, setGenreList] = useState([]);
  const [nameQuery, setNameQuery] = useState('');
  const [genreName, setGenreName] = useState('');
  const searchFormRef = useRef(null);
  const newGenreFormRef = useRef(null);
  const limit = 50;
  const GENRE_ENDPOINT = 'http://localhost:3002/api/genres';

  function fetchGenres() {
    Axios.get(
      `${GENRE_ENDPOINT}/${limit}?q=${nameQuery.replace(' ', '%20')}`
    ).then((response) => {
      setGenreList(response.data);
    });
  }

  function submitNewGenre() {
    Axios.post(`${GENRE_ENDPOINT}`, {
      name: genreName
    }).then((response) => {
      fetchGenres();
      newGenreFormRef.current.reset();
    });
  }

  function deleteGenre(genreId) {
    Axios.delete(`${GENRE_ENDPOINT}/${genreId}`).then(fetchGenres);
  }

  useEffect(() => {
    Axios.get(`${GENRE_ENDPOINT}/${limit}`).then((response) => {
      setGenreList(response.data);
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
      <h2>Genres</h2>

      <h3>Create a Genre</h3>
      <form
        ref={newGenreFormRef}
        onSubmit={(e) => {
          e.preventDefault();
          submitNewGenre();
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
          <label style={{ margin: 10 }}>Name of Genre</label>
          <input type="text" onChange={(e) => setGenreName(e.target.value)} />
        </div>
        <input type="submit" style={{ margin: 10 }} />
      </form>

      {/* Search bar */}
      <h3>Search for a Genre</h3>
      <form
        ref={searchFormRef}
        onSubmit={(e) => {
          e.preventDefault();
          fetchGenres();
          searchFormRef.current.reset();
        }}
      >
        <label style={{ padding: 10 }}>Input a Genre Name</label>
        <input
          type="text"
          id="search-name-input"
          onChange={(e) => setNameQuery(e.target.value)}
        />
        <input type="submit" />
      </form>

      {/* Genre list container */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {genreList.map((genre) => (
          <GenreCard
            key={genre.genre_id}
            id={genre.genre_id}
            name={genre.name}
            deleteGenre={deleteGenre}
            fetchGenres={fetchGenres}
          />
        ))}
      </div>
    </div>
  );
}
