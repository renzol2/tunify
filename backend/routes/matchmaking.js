const routes = require('express').Router();
const db = require('../db');

/**
 * Queries MySQL database
 * @param {String} query SQL query
 * @param {Object} response response to send to client
 */
 function queryDb(query, response) {
    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        response.status(500).send(err);
      } else {
        console.log(`Success, sent ${result.length} results`);
        response.status(200).send(result);
      }
    });
  }

/**
 * GET /api/matchmaking/UserSong/:limit/:userid
 *
 * Get the 50 users who “liked” the most amount of similar SONGS as current user
 */
routes.get('/UserSong/:limit/:userId', (req, response) => {
  console.log('GET /:UserSong:limit:userId invoked');
  const limit = req.params.limit;
  const userId = req.params.userId;

  const query = `
    SELECT COUNT(*) as num_similar_songs, User.user_id, User.first_name, User.last_name, User.email, User.dob
    FROM (
        SELECT UserSong.user_id, UserSong.song_id
        FROM UserSong
        WHERE UserSong.song_id IN (
            SELECT UserSong.song_id
            FROM UserSong
            WHERE UserSong.user_id = ${userId}
        ) 
    ) u JOIN User ON User.user_id = u.user_id
    GROUP BY u.user_id
    HAVING u.user_id != ${userId}
    ORDER BY num_similar_songs DESC   
    LIMIT ${limit}  
  `;

    queryDb(query, response);

});

/**
 * GET /api/matchmaking/UserGenre/:limit/:userid
 *
 * Get the 50 users who “liked” the most amount of similar GENRES as current user
 */
 routes.get('/UserGenre/:limit/:userId', (req, response) => {
    console.log('GET /:UserGenre:limit:userId invoked');
    const limit = req.params.limit;
    const userId = req.params.userId;
  
    const query = `
        SELECT COUNT(*) as num_similar_genres, User.user_id, User.first_name, User.last_name, User.email, User.dob
        FROM (
            SELECT UserGenre.user_id, UserGenre.genre_id
            FROM UserGenre
            WHERE UserGenre.genre_id IN (
                SELECT UserGenre.genre_id
                FROM UserGenre
                WHERE UserGenre.user_id = ${userId}
            ) 
        ) u JOIN User ON User.user_id = u.user_id
        GROUP BY u.user_id
        HAVING u.user_id != ${userId}
        ORDER BY num_similar_genres DESC
        LIMIT ${limit}
    `;
  
      queryDb(query, response);
  
  });


  /**
 * GET /api/matchmaking/UserArtist/:limit/:userid
 *
 * Get the 50 users who “liked” the most amount of similar ARTISTS as current user
 */
 routes.get('/UserArtist/:limit/:userId', (req, response) => {
    console.log('GET /:UserArtist:limit:userId invoked');
    const limit = req.params.limit;
    const userId = req.params.userId;
  
    const query = `
        SELECT COUNT(*) as num_similar_artists, User.user_id, User.first_name, User.last_name, User.email, User.dob
        FROM (
            -- selects all users that have liked artists that the given user 1 has liked
            SELECT UserArtist.user_id, UserArtist.artist_id
            FROM UserArtist
            WHERE UserArtist.artist_id IN (
                SELECT UserArtist.artist_id
                FROM UserArtist
                WHERE UserArtist.user_id = ${userId}
            ) 
        ) u JOIN User ON User.user_id = u.user_id
        GROUP BY u.user_id
        HAVING u.user_id != ${userId}
        ORDER BY num_similar_artists DESC
        LIMIT ${limit}
    `;
  
      queryDb(query, response);
  
});

/**
 * POST /api/songs
 * Inserts song into Song table using values in request body
 * Request body must have a `name`, `genre_id`, `artist_id`, `date`
 */
routes.post('/', (req, response) => {
  console.log('POST /api/songs/ invoked: adding a new songs to table');
  console.log(req.body);
  const {name, duration, date} = req.body;

  const songInsertQuery =
    'INSERT INTO `Song` (`name`, `duration`, `date`) VALUES (?, ?, ?)';
  db.query(songInsertQuery, [name, duration, date], (err, result) => {
    if (err) {
      console.error(err);
      response.status(500).send(err);
    } else {
      console.log(result);
      response.status(200).send(result);
    }
  });
});

/**
 * PUT /api/songs/:songId
 * Updates song with given id
 * Request body must have a `name`, `genre_id`, `artist_id`, `date`
 */
routes.put('/:songId', (req, response) => {
  console.log('PUT /api/songs/:songId invoked');
  console.log(req.body);
  const songId = req.params.songId;
  const {name, duration, date} = req.body;

  const songUpdateQuery =
    'UPDATE `Song` SET `name` = ?, `duration` = ?, `date` = ? WHERE `song_id` = ? ';
  db.query(songUpdateQuery, [name, duration, date, songId], (err, result) => {
    if (err) {
      console.error(err);
      response.status(500).send(err);
    } else {
      console.log(`Song ${songId} successfully updated`)
      console.log(result);
      response.status(200).send(result);
    }
  });
});

/**
 * DELETE /api/song/songId
 * Deletes the song from Song table with specified id
 */
routes.delete('/:songId', (req, response) => {
  console.log('DELETE /api/songs/:songId invoked');
  const songId = req.params.songId;

  const songDeleteQuery = 'DELETE FROM `Song` WHERE `song_id`= ?';
  db.query(songDeleteQuery, songId, (err, result) => {
    if (err) {
      console.error(err);
      response.status(500).send(err);
    } else {
      console.log(result);
      response.status(200).send(result);
    }
  });
});

module.exports = routes;