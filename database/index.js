const pgp = require('pg-promise')();

const connection = {
// host: 'localhost',
  host: '172.17.0.4/16',
  port: 5432,
  database: 'letsgo',
};

const db = pgp(connection);


module.exports = db;
