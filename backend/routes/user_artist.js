const routes = require('express').Router();
const db = require('../db');

/**
 * GET /api/user_artist/:limit
 * Returns array of user_artist relations limited by the parameter
 * ex. /api/user_artist/30
 *
 * Including a non-number as limit should(?) return ALL user-artist relations
 * ex. /api/user_artist/all
 */
routes.get('/:limit', (req, response) => {
  console.log('GET /api/user_artist/:limit invoked');
  const userIdQuery = req.query.userIdQuery;
  const artistIdQuery = req.query.artistIdQuery;

  let whereClause = '';
  if (userIdQuery !== undefined) {
    whereClause += `WHERE user_id LIKE '${userIdQuery}'`;
  }
  if (artistIdQuery !== undefined) {
    whereClause += `${
      Boolean(whereClause) ? 'AND' : 'WHERE'
    } artist_id LIKE '${artistIdQuery}'`;
  }

  const limit = req.params.limit;
  const selectQuery = `
		  SELECT * 
		  FROM UserArtist 
		  ${whereClause}
		  ORDER BY user_artist_id DESC
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
 * POST /api/user_artist
 * Inserts user_artist into UserArtist table using values in request body
 * Request body must have a `userId` and 'artistId'
 */
 routes.post('/', (req, response) => {
  console.log('POST /api/user_artist/ invoked');
  console.log(req.body);
  const { user_id: userId, artist_id: artistId } = req.body;

  const userArtistInsertQuery =
    'INSERT INTO `UserArtist` (`user_id`, `artist_id`) VALUES (?,?)';
  db.query(
    userArtistInsertQuery,
    [userId, artistId],
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
 * DELETE /api/user_artist/
 * Deletes the user-artist relation from UserArtist table with specified userId and artistId
 */
routes.delete('/', (req, response) => {
  console.log('DELETE /api/user_artist/ invoked');
  const userIdQuery = req.query.userIdQuery;
  const artistIdQuery = req.query.artistIdQuery;

  if (userIdQuery === undefined || artistIdQuery === undefined) {
	  return response.status(500);
  }

  const userArtistDeleteQuery = 'DELETE FROM `UserArtist` WHERE `user_id`= ? AND `artist_id`= ?';
  db.query(
	  userArtistDeleteQuery, 
	  [userIdQuery, artistIdQuery], 
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
