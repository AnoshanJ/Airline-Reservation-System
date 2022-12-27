const Pool = require('pg').Pool;
const config = require("../config/config.js");
const connection =  new Pool(config.db);

// connection.connect(function(err){
//     if (err) throw err;
//     console.log("Connected to the database successfully!");
// });

module.exports = connection;