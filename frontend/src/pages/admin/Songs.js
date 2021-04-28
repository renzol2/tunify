import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import SongCard from '../components/SongCard';


export default function Songs() {
  const [songList, setSongList] = useState([]);
  const [nameQuery, setNameQuery] = useState('');
  const [songName, setSongName] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(0);
  const searchFormRef = useRef(null);
  const newSongFormRef = useRef(null);
  const limit = 50;
  const SONG_ENDPOINT = 'http://localhost:3002/api/songs';
  
  function fetchSongs() {
    Axios.get(
      `${SONG_ENDPOINT}/${limit}?q=${nameQuery.replace(' ', '%20')}`
    ).then((response) => {
      setSongList(response.data);
    });
  }

  function submitNewSong() {
    Axios.post(`${SONG_ENDPOINT}`, {
      name: songName,
      duration: duration,
      date: date,
    }).then((response) => {
      fetchSongs();
      newSongFormRef.current.reset();
    });
  }

  function deleteSong(songId) {
    Axios.delete(`${SONG_ENDPOINT}/${songId}`).then(fetchSongs);
  }

  useEffect(() => {
    Axios.get(`${SONG_ENDPOINT}/${limit}`).then((response) => {
      setSongList(response.data);
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
      <h2>Songs</h2>

      <h3>Add new songs</h3>
      <form
        ref={newSongFormRef}
        onSubmit={(e) => {
          e.preventDefault();
          submitNewSong();
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
          <label style={{ margin: 10 }}>Song name</label>
          <input type="text" onChange={(e) => setSongName(e.target.value)} />

          <label style={{ margin: 10 }}>Duration</label>
          <input
            type="number"
            onChange={(e) => setDuration(e.target.value)}
          />

          <label style={{ margin: 10 }}>Song date</label>
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <input type="submit" style={{ margin: 10 }} />
      </form>

      {/* Search bar */}
      <h3>Search songs</h3>
      <form
        ref={searchFormRef}
        onSubmit={(e) => {
          e.preventDefault();
          fetchSongs();
          searchFormRef.current.reset();
        }}
      >
        <label style={{ padding: 10 }}>Search song by name</label>
        <input
          type="text"
          id="search-name-input"
          onChange={(e) => setNameQuery(e.target.value)}
        />
        <input type="submit" />
      </form>

      {/* Song list container */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {songList.map((song) => (
          <SongCard
            key={song.song_id}
            id={song.song_id}
            name={song.name}
            duration={song.duration}
            date={song.date}
            deleteSong={deleteSong}
            fetchSongs={fetchSongs}
          />
        ))}
      </div>
    </div>
  );
}
