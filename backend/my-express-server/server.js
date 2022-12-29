//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/report.routes.js");
const port = require("./config/config").port;

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// parse requests of content-type - application/json
app.use(bodyParser.json())


app.get("/", function(req, res){
    res.render("home", {docTitle: "B-Airways"});
})

app.get("/search", function(req,res){
    res.send("Search Page Here");
})

app.use("/", router);

app.get("/login", function(req, res){
    res.render("login", {docTitle: "LOGIN"});
  });


router.get('/booking', function(req, res) {
    try {
        res.render("booking", {docTitle: "BOOKING"});
    } catch (err) {
        console.log(err);
        res.send("500");
    }
});


// Require employee routes
const bookingroutes = require('./routes/booking.routes')
// using as middleware
app.use('/booking', bookingroutes)

const registerRoutes = require('./routes/register.routes')
app.use('/register', registerRoutes)



app.listen(port, function(){
    console.log("Server started on port: "+port);
});
