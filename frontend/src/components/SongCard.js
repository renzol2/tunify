import React, { useRef, useState } from 'react';
import Axios from 'axios';

/**
 * Individual card for each artist on Artist page
 * @param {{ 
 *  id: Number, 
 *  name: String, 
 *  popularity: Number, 
 *  bio: String | null, 
 *  deleteArtist: Function, 
 *  fetchArtists: Function 
 * }}
 */
export default function SongCard({
  id,
  name,
  duration,
  date,
  deleteSong,
  fetchSongs
}) {
  // State variables to update artist with
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newDuration, setNewDuration] = useState(duration);
  const [newDate, setNewDate] = useState(date);
  const updateFormRef = useRef(null);
  const SONG_ENDPOINT = 'http://localhost:3002/api/songs';

  function updateSong() {
    Axios.put(`${SONG_ENDPOINT}/${id}`, {
        name: newName,
        duration: newDuration,
        date: newDate,
    }).then((response) => {
      fetchSongs();
      setShowForm(false);
    });
  }

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
      {/* Song info */}
      <h4>
        {name} (ID: {id})
      </h4>
      <p>Genre ID: {genre_id.toFixed(2)}</p>
      <p>Artist ID: {artist_id.toFixed(2)}</p>
      <p>Date: {date.toFixed(2)}</p>


      {/* Form to update artist */}
      <button
        onClick={() => setShowForm(!showForm)}
        style={{ borderRadius: 8 }}
      >
        Toggle update form
      </button>
      {showForm && (
        <form
          ref={updateFormRef}
          onSubmit={(e) => {
            e.preventDefault();
            updateSong();
          }}
          style={{
            margin: 10
          }}
        >
          <label style={{ margin: 10 }}>Update name</label>
          <input type="text" onChange={(e) => setNewName(e.target.value)} />

          <br />

          <label style={{ margin: 10 }}>Update duration</label>
          <input
            type="number"
            onChange={(e) => setNewDuration(e.target.value)}
          />

          <br />

          <label style={{ margin: 10 }}>Update date</label>
          <input
            type="date"
            onChange={(e) => setNewDate(e.target.value)}
          />

          <br />

          <input type="submit" />
        </form>
      )}

      <br />

      {/* Delete song button */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          paddingRight: '10%',
        }}
      >
        <button
          onClick={() => deleteSong(id)}
          style={{
            backgroundColor: 'darkred',
            color: 'white',
            borderRadius: 8,
          }}
        >
          Delete this song
        </button>
      </div>
    </div>
  );
}
