const Pool = require('pg').Pool;

const connection =  new Pool(  {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DBNAME,
    port: process.env.DB_PORT,
});

module.exports = connection;