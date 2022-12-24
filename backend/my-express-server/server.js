//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/report.routes.js");

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
})

app.get("/search", function(req,res){
    res.send("Search Page Here");
})

app.get("/booking", function(req,res){
    res.send("Booking Page");
})


app.use("/", router);


app.listen(port, function(){
    console.log("Server started on port: "+port);
});
