const routes = require('express').Router();
const db = require('../db');

/**
 * GET /api/user_song/:limit
 * Returns array of user_song relations limited by the parameter
 * ex. /api/user_song/30
 *
 * Including a non-number as limit should(?) return ALL user-song relations
 * ex. /api/user_song/all
 */
routes.get('/:limit', (req, response) => {
  console.log('GET /api/user_song/:limit invoked');
  const userIdQuery = req.query.userIdQuery;
  const songIdQuery = req.query.songIdQuery;

  let whereClause = '';
  if (userIdQuery !== undefined) {
    whereClause += `WHERE user_id LIKE '${userIdQuery}'`;
  }
  if (songIdQuery !== undefined) {
    whereClause += `${
      Boolean(whereClause) ? 'AND' : 'WHERE'
    } song_id LIKE '${songIdQuery}'`;
  }

  const limit = req.params.limit;
  const selectQuery = `
		  SELECT * 
		  FROM UserSong 
		  ${whereClause}
		  ORDER BY user_song_id DESC
		  ${Boolean(limit) && !isNaN(limit) ? `LIMIT ${limit}` : ''}
	  `;
  
  console.log(selectQuery);
  db.query(selectQuery, (err, result) => {
    if (err) {
      console.error(err);
      response.status(500).send(err);
    } else {
      console.log(`Success, sent ${result.length} users`);
      response.status(200).send(result);
    }
  });
});


/**
 * POST /api/user_song
 * Inserts user_song into UserSong table using values in request body
 * Request body must have a `userId` and 'songId'
 */
 routes.post('/', (req, response) => {
  console.log('POST /api/user_song/ invoked');
  console.log(req.body);
  const { user_id: userId, song_id: songId } = req.body;

  const userSongInsertQuery =
    'INSERT INTO `UserSong` (`user_id`, `song_id`) VALUES (?,?)';
  db.query(
    userSongInsertQuery,
    [userId, SongId],
    (err, result) => {
      if (err) {
        console.error(err);
        response.status(500).send(err);
      } else {
        console.log(result);
        response.status(200).send(result);
      }
    }
  );
});

/**
 * DELETE /api/user_song/
 * Deletes the user-song relation from UserSong table with specified userId and songId
 */
routes.delete('/', (req, response) => {
  console.log('DELETE /api/user_song/ invoked');
  const userIdQuery = req.query.userIdQuery;
  const songIdQuery = req.query.songIdQuery;

  if (userIdQuery === undefined || songIdQuery === undefined) {
	  return response.status(500).send();
  }

  const userSongDeleteQuery = 'DELETE FROM `UserSong` WHERE `user_id`= ? AND `song_id`= ?';
  db.query(
	  userSongDeleteQuery, 
	  [userIdQuery, songIdQuery], 
	  (err, result) => {
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
