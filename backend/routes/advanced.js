const routes = require('express').Router();
const mysql = require('mysql');

var db = mysql.createConnection({
  host: '35.223.243.139',
  user: 'root',
  password: '6hqIAjcwnhDdsC3x',
  database: 'tunify',
});

db.connect(function (err) {
  if (err) throw err;
});

/**
 * Queries MySQL database
 * @param {String} query SQL query
 * @param {Object} response response to send to client
 */
function queryDb(query, response) {
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      response.status(500).send(err);
    } else {
      console.log(`Success, sent ${result.length} results`);
      response.status(200).send(result);
    }
  });
}

/**
 * GET /api/advanced/1/:limit
 *
 * Birthday Tracks:
 * returns name of song, user first and last name, and user date
 * of birth of users that had a birth date on the same day as the
 * release date of a song
 */
routes.get('/1/:limit', (req, response) => {
  console.log('GET /api/advanced/1/:limit invoked');

  const limit = req.params.limit;
  const query = `
    SELECT DISTINCT Song.name, User.first_name, User.last_name, User.dob
    FROM Song JOIN User ON Song.date = User.dob
    GROUP BY Song.name, User.first_name, User.last_name, User.dob
    LIMIT ${limit}
  `;

  queryDb(query, response);
});

/**
 * GET /api/advanced/2/:limit
 * 
 * 21st Century Songs:
 * Returns tracks from 21st century
 */
routes.get('/2/:limit', (req, response) => {
  console.log('GET /api/advanced/2/:limit invoked');

  const limit = req.params.limit;
  const query = `
    SELECT x.track, x.year
    FROM (
      SELECT name AS track, date AS year
      FROM Song
      WHERE date >= 20000101 
    ) x
    GROUP BY x.track, x.year
    ORDER BY x.year ASC
    LIMIT ${limit}
  `;

  queryDb(query, response);
});

/**
 * GET /api/advanced/3/:limit
 * 
 * Top 50% Artist Popularity By Percentage
 */
routes.get('/3/:limit', (req, response) => {
  console.log('GET /api/advanced/3/:limit invoked');

  const limit = req.params.limit;
  const query = `
    SELECT x.artName, x.artPop
    FROM (
      SELECT Artist.name as artName, Artist.popularity as artPop
      FROM Artist 
      WHERE Artist.popularity >= 50
    ) x
    GROUP BY x.artName, x.artPop
    LIMIT ${limit}
  `;

  queryDb(query, response);
});

/**
 * GET /api/advanced/4/:limit
 * 
 * Users with the Same First Name as an Artist with Popularity less than 50
 */
routes.get('/4/:limit', (req, response) => {
  console.log('GET /api/advanced/4/:limit invoked');

  const limit = req.params.limit;
  const query = `
    SELECT DISTINCT User.first_name, User.last_name, pa.name
    FROM User, (
      SELECT * FROM Artist
      where LENGTH(Artist.name) <= 10
    ) pa
    WHERE CONCAT(User.first_name, ' ') = LEFT(pa.name, LENGTH(User.first_name) + 1)
    GROUP BY User.first_name, User.last_name, pa.name
    LIMIT ${limit}
  `;

  queryDb(query, response);
});

module.exports = routes;
