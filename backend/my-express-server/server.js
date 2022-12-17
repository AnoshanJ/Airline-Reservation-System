//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser")
// const config = require("config")
var mysql = require('mysql2')
const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

var con = mysql.createConnection({
host : "localhost",
user : "root",
password : "1234",
database: "airline_res"
});

var flight_result = 0;

app.get("/", function(req, res){
    // console.log(request);
    res.sendFile(__dirname+"/index.html");
})

app.get("/search", function(req,res){
    res.send("Search Page Here");
})

app.get("/report", function(req,res){
    res.render("report", {flights: flight_result});
})

app.post("/report", function(req,res){
    con.connect(function(err){
        if (err) throw err;
        console.log("Connected!");
        var destination = req.body.destination;
        sql = "SELECT * FROM flight WHERE Destination = ?";
        con.query(sql, [destination], function(err, result, fields){
            if (err) throw err;
            console.log(result);
            flight_result = result;
            res.redirect("/report");
        })    
    });

});

app.get("/booking", function(req,res){
    res.send("Booking Page");
})

app.listen(port, function(){
    console.log("Server started on port {port}");
});
