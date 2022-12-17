//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser")
// const config = require("../config");
var mysql = require('mysql2');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

var con = mysql.createConnection({
host : "localhost",
user : "root",
password : "1234",
database: "airline_res"
});

app.get("/", function(req, res){
    // console.log(request);
    res.sendFile(__dirname+"/index.html");
})

app.get("/search", function(req,res){
    res.send("Search Page Here");
})

app.get("/report", function(req,res){
    
    con.connect(function(err){
        if (err) throw err;
        console.log("Connected!");

        //escaping using placeholders
        var brand = "Airbus";
        sql = "SELECT * FROM plane_type WHERE brand = ?";
        con.query(sql, [brand], function(err, result, fields){
            if (err) throw err;
            console.log(result);
            console.log("Model of the "+brand+" plane is "+ result[0]["Model"]);
            res.send("Model of the "+brand+" plane is "+ result[0]["Model"]);            
        })
    
    });

})
app.get("/booking", function(req,res){
    res.send("Booking Page");
})

app.listen(3000, function(){
    console.log("Server started on port {port}");
});
