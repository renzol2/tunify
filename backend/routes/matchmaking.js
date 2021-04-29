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
 * Calls a stored procedure that runs three advanced queries to find the 
 * shared "liked" songs, artists, and genres between two users
 *
 * This creates and returns THREE different tables (the result of three select statements in one procedure)
 * 1) SharedArtists (has one column, "artisto")
 * 2) SharedGenres (has one column, "genreo")
 * 3) SharedSongs (has one column, "songo")
 */
   routes.get('/UserArtist/:limit/:userId1/:userId2', (req, response) => {
    console.log('GET /:UserArtist:limit:userId:userId2 invoked');
    const userId1 = req.params.userId1;
    const userId2 = req.params.userId2;
  
    // the name of the procedure is "trial"
    const query = `
        CALL trial(${userId1}, ${userId2});
    `;
  
    queryDb(query, response);
  
});

/**
 * Inserts a row into the UserUser table. Assumes that userId1 liked userId2.
 */
routes.post('/api/user-user', (req, response) => {
  console.log('POST /api/user-user invoked');
  console.log(req.body);
  const {userId1, userId2} = req.body;

  const userInsertQuery =
    'INSERT INTO `UserUser` (`user_1_id`, `user_2_id`) VALUES (?, ?)';
  db.query(userInsertQuery, [userId1, userId2], (err, result) => {
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
 * DELETE /api/user-user
 * Deletes the user to user relationship from UserUser table with specified ids
 */
routes.delete(' /api/user-user', (req, response) => {
  console.log('DELETE /api/user-user invoked');
  const {userId1, userId2} = req.body;

  const userDeleteQuery = 'DELETE FROM `UserUser` WHERE `user_id_1`= ? AND `user_id_2` = ?';
  db.query(userDeleteQuery, [userId1, userId2], (err, result) => {
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