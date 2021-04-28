const routes = require('express').Router();
const db = require('../db');

/**
 * GET /api/artist_genre/:limit
 * Returns array of artist_genre relations
 * ex. /api/artist_genre/30
 *
 * Including a non-number as limit should(?) return ALL artist_genre relations
 * ex. /api/artist_genre/all
 */
 routes.get('/:limit', (req, response) => {
	console.log('GET /api/artist_genre/:limit invoked');
	const artistIdQuery = req.query.artistIdQuery;
	const genreIdQuery = req.query.genreIdQuery;
  
	let whereClause = '';
	if (artistIdQuery !== undefined) {
	  whereClause += `WHERE artist_id LIKE '%${artistIdQuery}%'`;
	}
	if (genreIdQuery !== undefined) {
	  whereClause += `${
		Boolean(whereClause) ? 'AND' : 'WHERE'
	  } genre_id LIKE '%${genreIdQuery}%'`;
	}
  
	const limit = req.params.limit;
	const selectQuery = `
			SELECT * 
			FROM ArtistGenre 
			${whereClause}
			ORDER BY artist_genre_id DESC
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
  