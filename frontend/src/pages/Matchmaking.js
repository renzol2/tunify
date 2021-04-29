import React, { useState, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import Axios from 'axios';

export default function Matchmaking() {
  const MATCHMAKING_QUERY_ENDPOINT = 'http://localhost:3002/api/matchmaking';
  const LIMIT = 50;
  const [responseList1, setResponseList1] = useState([]);
  const [responseList2, setResponseList2] = useState([]);
  const [responseList3, setResponseList3] = useState([]);

  function runQuery(queryType, userId) {
    const URL = `${MATCHMAKING_QUERY_ENDPOINT}/${queryType}/${LIMIT}/${userId}`;
    Axios.get(URL).then((response) => {
      if (queryType === 'UserSong') {
        setResponseList1(response.data);
      } else if (queryType === 'UserArtist') {
        setResponseList2(response.data);
      } else if (queryType === 'UserGenre') {
        setResponseList3(response.data);
      } 
    });
  }

  return (
    <Box>
      Matchmaking
      <br />
      <input type="submit" onClick={() => runQuery("UserArtist", 1)} />
      <input type="submit" onClick={() => runQuery("UserArtist", 1)} />

    </Box>

    
  )
}