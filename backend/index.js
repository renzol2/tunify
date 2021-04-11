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
  const sqlSelect = `SELECT * FROM Genre LIMIT ${limit}`;
  db.query(sqlSelect, (err, result) => {
    response.send(result);
  });
});

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
      response.status(500).send(err);
    } else {
      response.status(200).send(result);
    }
  });
});

app.post('/api/artists/', (req, response) => {
  console.log('POST /api/artists/ invoked');
  console.log(req.body);
  const { name, popularity } = req.body;

  const artistInsertQuery =
    'INSERT INTO `Artist` (`name`, `popularity`) VALUES (?,?)';
  db.query(artistInsertQuery, [name, popularity], (err, result) => {
    if (err) {
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
