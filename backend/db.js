const mysql = require('mysql');

let config = {
  host: '35.223.243.139',
  user: 'root',
  password: '6hqIAjcwnhDdsC3x',
  database: 'tunify',
  socketPath: '/cloudsql/tunify-307120:us-central1:tunifyinstance'
};

// if (
//   process.env.INSTANCE_CONNECTION_NAME &&
//   process.env.NODE_ENV === 'production'
// ) {
//   config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
// }

let db = mysql.createConnection(config);

// var db = mysql.createConnection({
//   host: '35.223.243.139',
//   user: 'root',
//   password: '6hqIAjcwnhDdsC3x',
//   database: 'tunify',
// });

db.connect(function (err) {
  if (err) throw err;
});

module.exports = db;
