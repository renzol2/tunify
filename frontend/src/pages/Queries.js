import React, { useState, useRef } from 'react';
import '../Queries.css';
import Axios from 'axios';

export default function RunQueries() {
  let key = 0;
  const searchFormRef = useRef(null);
  const ADVANCED_QUERY_ENDPOINT = 'http://localhost:3002/api/advanced';
  const LIMIT = 50;
  const [responseList1, setResponseList1] = useState([]);
  const [responseList2, setResponseList2] = useState([]);
  const [responseList3, setResponseList3] = useState([]);
  const [responseList4, setResponseList4] = useState([]);

  const [query_number, setQueryNumber] = useState(1);

  function runQuery() {
    const URL = `${ADVANCED_QUERY_ENDPOINT}/${query_number}/${LIMIT}`;
    Axios.get(URL).then((response) => {
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
        <div className="row">
          <div className="column">
            <label style={{ padding: 10 }}>
              Returns name of song, user first and last name, and user date of
              birth of users that had a birth date on the same day as the
              release date of a song.
            </label>
            <br />
            <input type="submit" onClick={() => setQueryNumber(1)} />

            {/* Response 1 list container */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {responseList1.map((response) => (
                <div key={key++}>
                  <h5>
                    {response.first_name} {response.last_name}
                  </h5>
                  <p>{response.name}</p>
                  <p>{response.dob}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="column">
            <label style={{ padding: 10 }}>
              Returns tracks from the 21st century.
            </label>
            <br />
            <input type="submit" onClick={() => setQueryNumber(2)} />

            {/* Response 2 list container */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {responseList2.map((response) => (
                <div key={key++}>
                  <h5>{response.track}</h5>
                  <p>{response.year}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="column">
            <label style={{ padding: 10 }}>
              Returns the top 50% of artists by their popularity (value ranging
              [0,100]).
            </label>
            <br />
            <input type="submit" onClick={() => setQueryNumber(3)} />

            {/* Response 3 list container */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {responseList3.map((response) => (
                <div key={key++}>
                  <h5>{response.artName}</h5>
                  <p>{response.artPop}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="column">
            <label style={{ padding: 10 }}>
              Returns the names of users and artists with popularity in the
              lower half and with the same first name.
            </label>
            <br />
            <input type="submit" onClick={() => setQueryNumber(4)} />

            {/* Response 4 list container */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {responseList4.map((response) => (
                <div key={key++}>
                  <h5>First name: {response.first_name}</h5>
                  <p>Artist name: {response.name}</p>
                  <p>
                    User name: {response.first_name} {response.last_name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
