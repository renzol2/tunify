import React, { useState, useEffect, useRef } from 'react';
import '../Queries.css';
import Axios from 'axios';

export default function RunQueries() {
  const searchFormRef = useRef(null);
  const ADVANCED_QUERY_ENDPOINT = 'http://localhost:3002/api/advanced/';
  const LIMIT = 50;
  const [responseList1, setResponseList1] = useState([]);
  const [responseList2, setResponseList2] = useState([]);
  const [responseList3, setResponseList3] = useState([]);
  const [responseList4, setResponseList4] = useState([]);

  const [query_number, setQueryNumber] = useState('');

  function runQuery() {
    Axios.get(
      `${ADVANCED_QUERY_ENDPOINT}/${query_number}/${LIMIT}`
    ).then((response) => {
      if (query_number === 1) {
        setResponseList1(response.data);
      } else if (query_number === 2) {
        setResponseList2(response.data);
      } else if (query_number === 3) {
        setResponseList3(response.data);
      } else if (query_number === 4) {
        setResponseList4(response.data);
      }
    });
  }

  return (
    <div
      style={{
        width: '100%',
        textAlign: 'center',
      }}
    >

      <h3>Run an Advanced Query</h3>
      <form
        ref={searchFormRef}
        onSubmit={(e) => {
          e.preventDefault();
          runQuery();
          searchFormRef.current.reset();
        }}
      >

        <div class="row">
          <div class="column">
            <label style={{ padding: 10 }}>
              Returns name of song, user first and last name, and user date of birth of users that had a birth date on the same day as the release date of a song.
            </label>
            <br />
            <input type="submit" onSubmit={() => setQueryNumber(1)} />

             {/* Response list container */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* {responseList1.map((genre) => (
                <GenreCard
                  key={genre.genre_id}
                  id={genre.genre_id}
                  name={genre.name}
                  deleteGenre={deleteGenre}
                  fetchGenres={fetchGenres}
                />
              ))} */}
            </div>
          </div>

          <div class="column">
            <label style={{ padding: 10 }}>
              Returns tracks from the 21st century.
            </label>
            <br />
            <input type="submit" onSubmit={() => setQueryNumber(2)} />
          </div>

          <div class="column">
            <label style={{ padding: 10 }}>
              Returns the top 50% of artists by their popularity (value ranging [0,100]).
            </label>
            <br />
            <input type="submit" onSubmit={() => setQueryNumber(3)} />
          </div>

          <div class="column">  
            <label style={{ padding: 10 }}>
              Returns the names of users and artists with popularity in the lower half and with the same first name.
            </label>
            <br />
            <input type="submit" onSubmit={() => setQueryNumber(4)} />
          </div>

        </div>
      </form>
    </div>
  );
}
