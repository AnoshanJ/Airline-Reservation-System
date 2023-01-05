const express = require("express");
const router = express.Router();
const checkRole = require('../middleware/auth');
const userDashboardController = require('../controllers/userDashboard.controller.js');

router.get('/userDashboard', checkRole('user'), (req, res) => {
    // The user is a user, so allow them to access the route
    try{
        // const formData = req.body;
        // console.log("User login",formData)
        // userDashboardController.getUserDetails(formData,res);
        //print the user cookies
// )
        console.log("User Cookies " + req.cookies.user);
        //print hte req.cookies.user object
        console.log('User Cookies ' + JSON.stringify(req.cookies.user));
        res.render("userDashboard", { formData: req, docTitle: "",title:"User Dashboard", sampleData: req.cookies.user, action:'list', userRole: req.cookies.userRole});

        console.log("userDashboard controller")
    } catch(err){
        console.log(err);
        res.send("1500");
    }
  });

module.exports = router;