const routes = require('express').Router();
const db = require('../db');

/**
 * GET /api/song_genre/:limit
 * Returns array of song_genre relations
 * ex. /api/song_genre/30
 *
 * Including a non-number as limit should(?) return ALL song_genre relations
 * ex. /api/song_genre/all
 */
 routes.get('/:limit', (req, response) => {
	console.log('GET /api/song_genre/:limit invoked');
	const songIdQuery = req.query.songIdQuery;
	const genreIdQuery = req.query.genreIdQuery;
  
	let whereClause = '';
	if (songIdQuery !== undefined) {
	  whereClause += `WHERE song_id LIKE '%${songIdQuery}%'`;
	}
	if (genreIdQuery !== undefined) {
	  whereClause += `${
		Boolean(whereClause) ? 'AND' : 'WHERE'
	  } genre_id LIKE '%${genreIdQuery}%'`;
	}
  
	const limit = req.params.limit;
	const selectQuery = `
			SELECT * 
			FROM SongGenre 
			${whereClause}
			ORDER BY song_genre_id DESC
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
  
  module.exports = routes;
  