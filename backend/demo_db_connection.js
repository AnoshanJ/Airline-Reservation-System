var mysql = require('mysql2');

var con = mysql.createConnection({
host : "localhost",
user : "root",
password : "1234",
database: "airline_res"
});



con.connect(function(err){
    if (err) throw err;
    console.log("Connected!");

    var country = "Sri Lanka";
    // escape the values to prevent SQL Injections
    var sql = "SELECT * FROM airport WHERE Country = " + mysql.escape(country);
    con.query(sql, function(err, result, fields){
        if (err) throw err;
        console.log(result)
    })
    //escaping using placeholders
    var brand = "Airbus";
    sql = "SELECT * FROM plane_type WHERE brand = ?";
    con.query(sql, [brand], function(err, result, fields){
        if (err) throw err;
        console.log("Model of the "+brand+" plane is "+ result[0]["Model"])
    })

});



