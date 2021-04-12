const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

// This is a test commit for Owen :)

var db = mysql.createConnection({
  host: '35.223.243.139',
  user: 'root',
  password: '6hqIAjcwnhDdsC3x',
  database: 'tunify',
});

db.connect(function (err) {
  if (err) throw err;
  // var sql = "INSERT INTO `movie_reviews` (`id`,`movieName`, `movieReview`) VALUES (5,'inception', 'good movie');";
  // db.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log(result.affectedRows + " record(s) updated");
  // });
});

// app.get('/', (require, response) => {
//     const sqlInsert = "INSERT INTO `movie_reviews` (`movieName`, `movieReview`) VALUES ('Spider2', 'good movie');";
//     db.query(sqlInsert, (err, result) => {
//         response.send("Hello world!!!");
//     })
// })

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/ping', (req, response) => {
  response.send('pong');
});

app.get('/api/songs/:limit', (req, response) => {
  const limit = req.params.limit;
  const sqlSelect = `SELECT * FROM Song LIMIT ${limit}`;
  db.query(sqlSelect, (err, result) => {
    response.send(result);
  });
});

app.get('/api/users/:limit', (req, response) => {
  const limit = req.params.limit;
  const sqlSelect = `SELECT * FROM User LIMIT ${limit}`;
  db.query(sqlSelect, (err, result) => {
    response.send(result);
  });
});

app.get('/api/genres/:limit', (req, response) => {
  const limit = req.params.limit;
  const sqlSelect = `SELECT * FROM Genre ORDER BY Genre.name ASC LIMIT ${limit}`;
  db.query(sqlSelect, (err, result) => {
    response.send(result);
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
      console.log(`Artist ${artistId} successfully updated`)
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


// CREATE a new genre given a genre name
 app.post('/api/genres/', (req, response) => {
  console.log('POST /api/genres/ invoked: adding a new genre to table');
  console.log(req.body);
  const name = req.body;

  const genreInsertQuery =
    'INSERT INTO `Genre` (`name`) VALUES (?)';
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

// app.post("/api/insert", (require, response) => {
//     const movieName = require.body.movieName;
//     const movieReview = require.body.movieReview;

//     const sqlInsert = "INSERT INTO `movie_reviews` (`movieName`, `movieReview`) VALUES (?,?)";
//     db.query(sqlInsert, [movieName, movieReview], (err, result) => {
//         console.log(error);
//     })
// });

// app.delete("/api/delete/:movieName", (require, response) => {
//     const movieName = require.params.movieName;

//     const sqlDelete = "DELETE FROM `movie_reviews` WHERE `movieName`= ?";
//     db.query(sqlDelete, movieName, (err, result) => {
//         if (err)
//         console.log(error);
//     })
// });

// app.put("/api/update/", (require, response) => {
//     const movieName = require.body.movieName;
//     const movieReview = require.body.movieReview;

//     const sqlUpdate = "UPDATE `movie_reviews` SET `movieReview` = ? WHERE `movieName`= ?";
//     db.query(sqlUpdate, [movieReview,movieName ], (err, result) => {
//         if (err)
//         console.log(error);
//     })
// });

app.listen(3002, () => {
  console.log('running on port 3002');
});
