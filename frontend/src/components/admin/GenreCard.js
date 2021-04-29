import React, { useRef, useState } from 'react';
import Axios from 'axios';

/**
 * Individual card for each genre on Genre page
 * @param {{ 
 *  id: Number, 
 *  name: String, 
 *  deleteGenre: Function, 
 *  fetchGenres: Function 
 * }}
 */
export default function GenreCard({
  id,
  name,
  deleteGenre,
  fetchGenres
}) {
  // State variables to update genre with
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState(name);
  const updateFormRef = useRef(null);
  const GENRE_ENDPOINT = 'http://localhost:3002/api/genres';

  function updateGenre() {
    Axios.put(`${GENRE_ENDPOINT}/${id}`, {
      name: newName
    }).then((response) => {
      fetchGenres();
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
      {/* Genre info */}
      <h4>
        {name} (ID: {id})
      </h4>

      {/* Form to update a genre */}
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
            updateGenre();
          }}
          style={{
            margin: 10
          }}
        >
          <label style={{ margin: 10 }}>Update name</label>
          <input type="text" onChange={(e) => setNewName(e.target.value)} />

          <br />

          <br />
          <input type="submit" />
        </form>
      )}

      <br />

      {/* Delete genre button */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          paddingRight: '10%',
        }}
      >
        <button
          onClick={() => deleteGenre(id)}
          style={{
            backgroundColor: 'darkred',
            color: 'white',
            borderRadius: 8,
          }}
        >
          Delete this genre
        </button>
      </div>
    </div>
  );
}
