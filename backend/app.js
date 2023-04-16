//jshint esversion:6
require("dotenv").config({ path: './config/.env' });
const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const port = process.env.BACKEND_PORT;

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(flash())
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  if (req.cookies.userRole) {
    req.session.userRole = req.cookies.userRole;
  } else {
    req.session.userRole = 'guest';
  }
  next();
});

// Get all files in the routes folder
const files = fs.readdirSync('./routes');

// Loop through each file and require it
files.forEach(file => {
  const routes = require(`./routes/${file}`);
  app.use(routes);
});

app.listen(port, function(){
    console.log("Server started on port: "+port);
});