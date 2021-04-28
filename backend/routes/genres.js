const routes = require('express').Router();
const db = require('../db');

// CREATES a new genre given a genre name
routes.post('/', (req, response) => {
  console.log('POST /api/genres/ invoked: adding a new genre to table');
  console.log(req.body);
  const { name } = req.body;

  const genreInsertQuery = 'INSERT INTO `Genre` (`name`) VALUES (?)';
  db.query(genreInsertQuery, name, (err, result) => {
    if (err) {
      console.error(err);
      response.status(500).send(err);
    } else {
      console.log(result);
      response.status(200).send(result);
    }
  });
});

// REMOVES a genre with the given genreId
routes.delete('/:genreId', (req, response) => {
  console.log('DELETE /api/genres/:genreId invoked');
  const genreId = req.params.genreId;

  const genreDeleteQuery = 'DELETE FROM `Genre` WHERE `genre_id`= ?';
  db.query(genreDeleteQuery, genreId, (err, result) => {
    if (err) {
      console.error(err);
      response.status(500).send(err);
    } else {
      console.log(result);
      response.status(200).send(result);
    }
  });
});

// UPDATES a genre with the given genreId
routes.put('/:genreId', (req, response) => {
  console.log('PUT /api/genres/:genreId invoked');
  console.log(req.body);
  const genreId = req.params.genreId;
  const { name } = req.body;

  const genreUpdateQuery =
    'UPDATE `Genre` SET `name` = ? WHERE `genre_id` = ? ';
  db.query(genreUpdateQuery, [name, genreId], (err, result) => {
    if (err) {
      console.error(err);
      response.status(500).send(err);
    } else {
      console.log(`Genre ${genreId} successfully updated`);
      console.log(result);
      response.status(200).send(result);
    }
  });
});

// GETS a genre with the given genre name
routes.get('/:limit', (req, response) => {
  console.log('GET /api/genres/:limit invoked');
  const nameQuery = req.query.q;
  console.log('name of genre we want is ', nameQuery);
  const limit = req.params.limit;
  const genreSelectQuery = `
        SELECT * 
        FROM Genre 
        ${nameQuery === undefined ? '' : `WHERE name LIKE '%${nameQuery}%'`}
        ORDER BY Genre.name ASC
        ${Boolean(limit) && !isNaN(limit) ? `LIMIT ${limit}` : ''}
    `;
  db.query(genreSelectQuery, (err, result) => {
    if (err) {
      console.error(err);
      response.status(500).send(err);
    } else {
      console.log(`Success, sent ${result.length} genres`);
      response.status(200).send(result);
    }
  });
});

module.exports = routes;