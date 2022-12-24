const mysql = require('mysql2');
const config = require("../config/config.js");
const connection = mysql.createConnection(config.db);

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected to the database successfully!");
});

module.exports = connection;