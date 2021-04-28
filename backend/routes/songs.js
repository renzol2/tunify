const routes = require('express').Router();
const db = require('../db');

routes.get('/:limit', (req, response) => {
  console.log('GET /api/songs/:limit invoked');
  const nameQuery = req.query.q;
  const limit = req.params.limit;
  const songSelectQuery = `
        SELECT * 
        FROM Song 
        ${nameQuery === undefined ? '' : `WHERE name LIKE '%${nameQuery}%'`}
        ORDER BY name DESC
        ${Boolean(limit) && !isNaN(limit) ? `LIMIT ${limit}` : ''}
    `;
  db.query(songSelectQuery, (err, result) => {
    if (err) {
      console.error(err);
      response.status(500).send(err);
    } else {
      console.log(`Success, sent ${result.length} songs`);
      response.status(200).send(result);
    }
  });
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