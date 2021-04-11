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
export default function ArtistCard({
  id,
  name,
  popularity,
  bio,
  deleteArtist,
  fetchArtists
}) {
  // State variables to update artist with
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newPopularity, setNewPopularity] = useState(popularity);
  const updateFormRef = useRef(null);
  const ARTIST_ENDPOINT = 'http://localhost:3002/api/artists';

  function updateArtist() {
    Axios.put(`${ARTIST_ENDPOINT}/${id}`, {
      name: newName,
      popularity: newPopularity
    }).then((response) => {
      fetchArtists();
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
      {/* Artist info */}
      <h4>
        {name} (ID: {id})
      </h4>
      <p>Popularity: {popularity.toFixed(2)}</p>

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
            updateArtist();
          }}
          style={{
            margin: 10
          }}
        >
          <label style={{ margin: 10 }}>Update name</label>
          <input type="text" onChange={(e) => setNewName(e.target.value)} />

          <br />

          <label style={{ margin: 10 }}>Update popularity</label>
          <input
            type="number"
            onChange={(e) => setNewPopularity(e.target.value)}
          />

          <br />
          <input type="submit" />
        </form>
      )}

      <br />

      {/* Delete artist button */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          paddingRight: '10%',
        }}
      >
        <button
          onClick={() => deleteArtist(id)}
          style={{
            backgroundColor: 'darkred',
            color: 'white',
            borderRadius: 8,
          }}
        >
          Delete this artist
        </button>
      </div>
    </div>
  );
}
