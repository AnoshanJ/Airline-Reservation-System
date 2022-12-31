const express = require("express");
const router = express.Router();

const userDashboardController = require('../controllers/userDashboard.controller.js');

router.get('/userDashboard', function(req, res) {
    try {
        const formData = req.body;
        userDashboardController.getUserDetails(formData, res);
  
    } catch (err) {
        console.log(err);
        res.send("1500");
    }
});

module.exports = router;