const pgp = require('pg-promise')();
const connection = {
    host: 'localhost',
    port: 5432,
    database: 'letsgo',
};
const db = pgp(connection);

module.exports = db