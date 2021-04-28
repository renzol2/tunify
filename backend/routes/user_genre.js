const routes = require('express').Router();
const db = require('../db');

/**
 * GET /api/user_genre/:limit
 * Returns array of user_genre relations limited by the parameter
 * ex. /api/user_genre/30
 *
 * Including a non-number as limit should(?) return ALL user-genres
 * ex. /api/user_genre/all
 */
routes.get('/:limit', (req, response) => {
  console.log('GET /api/user_genre/:limit invoked');
  const userIdQuery = req.query.userIdQuery;
  const genreIdQuery = req.query.genreIdQuery;

  let whereClause = '';
  if (userIdQuery !== undefined) {
    whereClause += `WHERE user_id LIKE '${userIdQuery}'`;
  }
  if (genreIdQuery !== undefined) {
    whereClause += `${
      Boolean(whereClause) ? 'AND' : 'WHERE'
    } genre_id LIKE '${genreIdQuery}'`;
  }

  const limit = req.params.limit;
  const selectQuery = `
		  SELECT * 
		  FROM UserGenre 
		  ${whereClause}
		  ORDER BY user_genre_id DESC
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
 * POST /api/users
 * Inserts user_genre into UserGenre table using values in request body
 * Request body must have a `userId` and 'genreId'
 */
 routes.post('/', (req, response) => {
  console.log('POST /api/user_genre/ invoked');
  console.log(req.body);
  const { user_id: userId, genre_id: genreId } = req.body;

  const userGenreInsertQuery =
    'INSERT INTO `UserGenre` (`user_id`, `genre_id`) VALUES (?,?)';
  db.query(
    userGenreInsertQuery,
    [userId, genreId],
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
 * DELETE /api/user_genre/userId
 * Deletes the user-genre relation from UserGenre table with specified userId and genreId
 */
routes.delete('/', (req, response) => {
  console.log('DELETE /api/user_genre/ invoked');
  const userIdQuery = req.query.userIdQuery;
  const genreIdQuery = req.query.genreIdQuery;

  if (userIdQuery === undefined || genreIdQuery === undefined) {
	  return response.status(500);
  }

  const userGenreDeleteQuery = 'DELETE FROM `UserGenre` WHERE `user_id`= ? AND `genre_id`= ?';
  db.query(
	  userGenreDeleteQuery, 
	  [userIdQuery, genreIdQuery], 
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
