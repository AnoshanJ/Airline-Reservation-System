const express = require("express");
const router = express.Router();
//registrationController to access RegisteredUser Table
const registrationController = require('../controllers/registration.controller.js');
 

router.get("/login", function(req, res){
    res.render("login", {docTitle: "LOGIN"});
  });

router.post("/login", function(req, res){
    registrationController.getUserByEmail(req, res);
});

module.exports = router;
