const express = require("express");
const router = express.Router();
//registrationController to access RegisteredUser Table
const registrationController = require('../controllers/registration.controller.js');

router.get("/login", function(req, res){
    res.render("login", {docTitle: "LOGIN"});
  });

router.get("/", function(req, res){
    res.render("register", {docTitle: "REGISTER"});
});

router.post("/", function(req, res){
    registrationController.createRegisteredUser(req, res);
});



module.exports = router;

