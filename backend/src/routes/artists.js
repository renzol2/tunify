const routes = require('express').Router();
const db = require('../db');

/**
 * GET /api/artists/:limit
 * Returns array of artists limited by the parameter
 * ex. /api/artists/30
 *
 * Including a non-number as limit should(?) return ALL artists
 * ex. /api/artists/all
 */
 routes.get('/:limit', (req, response) => {
  console.log('GET /api/artists/:limit invoked');
  const nameQuery = req.query.q;
  const limit = req.params.limit;
  const artistSelectQuery = `
        SELECT * 
        FROM Artist 
        ${nameQuery === undefined ? '' : `WHERE name LIKE '%${nameQuery}%'`}
        ORDER BY popularity DESC
        ${Boolean(limit) && !isNaN(limit) ? `LIMIT ${limit}` : ''}
    `;
  db.query(artistSelectQuery, (err, result) => {
    if (err) {
      console.error(err);
      response.status(500).send(err);
    } else {
      console.log(`Success, sent ${result.length} artists`);
      response.status(200).send(result);
    }
  });
});

/**
 * POST /api/artists
 * Inserts artist into Artist table using values in request body
 * Request body must have a `name` and `popularity`
 */
routes.post('/', (req, response) => {
  console.log('POST /api/artists/ invoked');
  console.log(req.body);
  const { name, popularity } = req.body;

  const artistInsertQuery =
    'INSERT INTO `Artist` (`name`, `popularity`) VALUES (?,?)';
  db.query(artistInsertQuery, [name, popularity], (err, result) => {
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
 * PUT /api/artists/:artistId
 * Updates artist with given id
 * Request body must have a `name` and `popularity`
 */
routes.put('/:artistId', (req, response) => {
  console.log('PUT /api/artists/:artistId invoked');
  console.log(req.body);
  const artistId = req.params.artistId;
  const { name, popularity } = req.body;

  const artistUpdateQuery =
    'UPDATE `Artist` SET `name` = ?, `popularity` = ? WHERE `artist_id` = ? ';
  db.query(artistUpdateQuery, [name, popularity, artistId], (err, result) => {
    if (err) {
      console.error(err);
      response.status(500).send(err);
    } else {
      console.log(`Artist ${artistId} successfully updated`);
      console.log(result);
      response.status(200).send(result);
    }
  });
});

/**
 * DELETE /api/artist/artistId
 * Deletes the artist from Artist table with specified id
 */
routes.delete('/:artistId', (req, response) => {
  console.log('DELETE /api/artists/:artistId invoked');
  const artistId = req.params.artistId;

  const artistDeleteQuery = 'DELETE FROM `Artist` WHERE `artist_id`= ?';
  db.query(artistDeleteQuery, artistId, (err, result) => {
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