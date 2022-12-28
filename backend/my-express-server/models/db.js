const Pool = require('pg').Pool;
const config = require("../config/config.js");
const connection =  new Pool(config.db);

module.exports = connection;