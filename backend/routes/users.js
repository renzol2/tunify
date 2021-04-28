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
 * GET /api/users/:limit
 * Returns array of users limited by the parameter
 * ex. /api/users/30
 *
 * Including a non-number as limit should(?) return ALL users
 * ex. /api/users/all
 */
 routes.get('/:limit', (req, response) => {
  console.log('GET /api/users/:limit invoked');
  const firstNameQuery = req.query.firstNameQuery;
  const lastNameQuery = req.query.lastNameQuery;
  const emailQuery = req.query.emailQuery;

  let whereClause = '';
  if (firstNameQuery !== undefined) {
    whereClause += `WHERE first_name LIKE '%${firstNameQuery}%'`;
  }
  if (lastNameQuery !== undefined) {
    whereClause += `${
      Boolean(whereClause) ? 'AND' : 'WHERE'
    } last_name LIKE '%${lastNameQuery}%'`;
  }
  if (emailQuery !== undefined) {
    whereClause += `${
      Boolean(whereClause) ? 'AND' : 'WHERE'
    } email LIKE '${emailQuery}'`;
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
 routes.put('/:userId', (req, response) => {
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
 routes.post('/', (req, response) => {
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
routes.delete('/:userId', (req, response) => {
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

module.exports = routes;
