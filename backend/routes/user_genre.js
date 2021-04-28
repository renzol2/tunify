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
    whereClause += `WHERE user_id LIKE '%${userIdQuery}%'`;
  }
  if (genreIdQuery !== undefined) {
    whereClause += `${
      Boolean(whereClause) ? 'AND' : 'WHERE'
    } genre_id LIKE '%${genreIdQuery}%'`;
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
 * DELETE /api/user/userId
 * Deletes the user from User table with specified id
 */
routes.delete('/:userId', (req, response) => {
  console.log('DELETE /api/users/:userId invoked');
  const userId = req.params.userId;

  const userDeleteQuery = 'DELETE FROM `User` WHERE `user_id`= ?';
  db.query(userDeleteQuery, userId, (err, result) => {
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
