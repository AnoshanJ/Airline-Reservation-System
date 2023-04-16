const express = require("express");
const router = express.Router();
//registrationController to access RegisteredUser Table
const registrationController = require('../controllers/registration.controller.js');
const checkRole = require("../middleware/auth.js");
 
router.get("/register", function(req, res){
    res.render("register", {docTitle: "USER REGISTRATION", userRole: req.cookies.userRole});
});

router.post("/register", function(req, res){
    registrationController.createRegisteredUser(req, res);
});

// router.get("/staff_register", checkRole('Manager'), function(req, res){
//     res.render("staff_register", {docTitle: "STAFF REGISTRATION", userRole: req.cookies.userRole});
// });

// router.post("/staff_register",checkRole('Manager'), function(req,res){
//     registrationController.registerstaff(req,res);
// })


module.exports = router;

