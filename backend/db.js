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

module.exports = db;