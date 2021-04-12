const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

var db = mysql.createConnection({
  host: '35.223.243.139',
  user: 'root',
  password: '6hqIAjcwnhDdsC3x',
  database: 'tunify',
});

db.connect(function (err) {
  if (err) throw err;
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/ping', (req, response) => {
  response.send('pong');
});

app.get('/api/songs/:limit', (req, response) => {
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
app.post('/api/songs/', (req, response) => {
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
app.put('/api/songs/:songId', (req, response) => {
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
app.delete('/api/songs/:songId', (req, response) => {
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

/**
 * GET /api/artists/:limit
 * Returns array of artists limited by the parameter
 * ex. /api/artists/30
 *
 * Including a non-number as limit should(?) return ALL artists
 * ex. /api/artists/all
 */
app.get('/api/artists/:limit', (req, response) => {
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
app.post('/api/artists/', (req, response) => {
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
app.put('/api/artists/:artistId', (req, response) => {
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
app.delete('/api/artists/:artistId', (req, response) => {
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

/** GET, PUT, POST, DELETE for users */

/**
 * GET /api/users/:limit
 * Returns array of users limited by the parameter
 * ex. /api/users/30
 *
 * Including a non-number as limit should(?) return ALL users
 * ex. /api/users/all
 */
app.get('/api/users/:limit', (req, response) => {
  console.log('GET /api/users/:limit invoked');
  const firstNameQuery = req.query.firstNameQuery;
  const lastNameQuery = req.query.lastNameQuery;

  let whereClause = '';
  if (firstNameQuery !== undefined) {
    whereClause += `WHERE first_name LIKE '%${firstNameQuery}%'`;
  }
  if (lastNameQuery !== undefined) {
    whereClause += `${
      Boolean(whereClause) ? 'AND' : 'WHERE'
    } last_name LIKE '%${lastNameQuery}%'`;
  }

  const limit = req.params.limit;
  const userSelectQuery = `
		  SELECT * 
		  FROM User 
		  ${whereClause}
		  ORDER BY dob DESC
		  ${Boolean(limit) && !isNaN(limit) ? `LIMIT ${limit}` : ''}
	  `;
  console.log(userSelectQuery);
  db.query(userSelectQuery, (err, result) => {
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
 * PUT /api/users/:artistId
 * Updates user with given id
 * Request body must have a `first_name`, 'last_name', 'email', and `dob`
 */
app.put('/api/users/:userId', (req, response) => {
  console.log('PUT /api/users/:userId invoked');
  console.log(req.body);
  const userId = req.params.userId;
  const { first_name: firstName, last_name: lastName, email, dob } = req.body;

  const userUpdateQuery =
    'UPDATE `User` SET `first_name` = ?, `last_name` = ?, `email` = ?, `dob` = ? WHERE `user_id` = ? ';
  db.query(
    userUpdateQuery,
    [firstName, lastName, email, dob, userId],
    (err, result) => {
      if (err) {
        console.error(err);
        response.status(500).send(err);
      } else {
        console.log(`User ${userId} successfully updated`);
        console.log(result);
        response.status(200).send(result);
      }
    }
  );
});

/**
 * POST /api/users
 * Inserts user into User table using values in request body
 * Request body must have a `first_name`, 'last_name', 'email', and 'dob'
 */
app.post('/api/users/', (req, response) => {
  console.log('POST /api/users/ invoked');
  console.log(req.body);
  const { first_name: firstName, last_name: lastName, email, dob } = req.body;

  const userInsertQuery =
    'INSERT INTO `User` (`first_name`, `last_name`, `email`, `dob`) VALUES (?,?,?,?)';
  db.query(
    userInsertQuery,
    [firstName, lastName, email, dob],
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
app.delete('/api/users/:userId', (req, response) => {
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

// CREATES a new genre given a genre name
app.post('/api/genres/', (req, response) => {
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
app.delete('/api/genres/:genreId', (req, response) => {
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
app.put('/api/genres/:genreId', (req, response) => {
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
app.get('/api/genres/:limit', (req, response) => {
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

const advanced = require('./routes/advanced');
app.use('/api/advanced', advanced);

app.listen(3002, () => {
  console.log('running on port 3002');
});
