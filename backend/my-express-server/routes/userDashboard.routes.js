const express = require("express");
const router = express.Router();
const checkRole = require('../middleware/auth');
const userDashboardController = require('../controllers/userDashboard.controller.js');

// router.get('/userDashboard', checkRole('user'), (req, res) => {
//     // The user is a user, so allow them to access the route
//     try{
//         const formData = req.body;
//         console.log("User login _____________",formData)
//         userDashboardController.getUserDetails(formData,res);
//     } catch(err){
//         console.log(err);
//         res.send("1500");
//     }
//   });

module.exports = router;