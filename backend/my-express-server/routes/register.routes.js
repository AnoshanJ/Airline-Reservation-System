const express = require("express");
const router = express.Router();
//registrationController to access RegisteredUser Table
const registrationController = require('../controllers/registration.controller.js');
 
router.get("/register", function(req, res){
    res.render("register", {docTitle: "REGISTER"});
});

router.post("/register", function(req, res){
    registrationController.createRegisteredUser(req, res);
});



module.exports = router;

