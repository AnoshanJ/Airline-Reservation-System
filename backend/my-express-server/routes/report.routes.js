const express = require("express");
const router = express.Router();
const checkRole = require('../middleware/auth');
//flightController to access Flight Table
const flightController = require('../controllers/flight.controller.js');

const responseValues = {
    revenue: 0, 
    passengerCount: 0, 
    flightCount: 0 , 
    bookingCount: 0, 
    nextFlight: 0,
    route : 0
  }

//default Page
router.get('/report', checkRole('Manager'),function(req, res) {
    try {
        const formData = req.body;
        // flightController.getPlaneModelRevenue(formData, res);
        flightController.getDetails(formData, res);
  
    } catch (err) {
        console.log(err);
        res.send("500");
    }
});


router.post('/report/passengerCount',checkRole('Manager'), function(req, res) {
    try {
        const formData = req.body;
        flightController.getFlightCount(formData, res);
  
    } catch (err) {
        console.log(err);
        res.send("500");
    }
});



module.exports = router;

