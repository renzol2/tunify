const routes = require('express').Router();
const db = require('../db');

/**
 * GET /api/artist_song/:limit
 * Returns array of artist_song relations
 * ex. /api/artist_song/30
 *
 * Including a non-number as limit should(?) return ALL artist_song relations
 * ex. /api/artist_song/all
 */
 routes.get('/:limit', (req, response) => {
	console.log('GET /api/artist_song/:limit invoked');
	const artistIdQuery = req.query.artistIdQuery;
	const songIdQuery = req.query.songIdQuery;
  
	let whereClause = '';
	if (artistIdQuery !== undefined) {
	  whereClause += `WHERE artist_id LIKE '%${artistIdQuery}%'`;
	}
	if (songIdQuery !== undefined) {
	  whereClause += `${
		Boolean(whereClause) ? 'AND' : 'WHERE'
	  } song_id LIKE '%${songIdQuery}%'`;
	}
  
	const limit = req.params.limit;
	const selectQuery = `
			SELECT * 
			FROM ArtistSong 
			${whereClause}
			ORDER BY artist_song_id DESC
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
  