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
    pastFlight: 0,
    route : 0
  }

//default Page
router.get('/report', checkRole('Manager'),function(req, res) {
    try {
        const formData = req.body;
        flightController.getDetails(formData, res, req.cookies.userRole);
  
    } catch (err) {
        console.log(err);
        res.send("500");
    }
});

router.post('/report/passengerCount',checkRole('Manager'), function(req, res) {
    try {
        const formData = req.body;
        flightController.getFlightCount(formData, res, req.cookies.userRole);
  
    } catch (err) {
        console.log(err);
        res.send("500");
    }
});
router.post('/report/bookingCount',checkRole('Manager'), function(req, res) {
    try {
        const formData = req.body;
        flightController.getBookingCount(formData, res, req.cookies.userRole);
  
    } catch (err) {
        console.log(err);
        res.send("500");
    }
});

router.post('/report/nextFlight',checkRole('Manager'), function(req, res) {
    try {
        const formData = req.body;
        flightController.getNextFlight(formData, res, req.cookies.userRole);
        
    }
    catch (err) {
        console.log(err);
        res.send("500");
    }
});

router.post('/report/pastFlight',checkRole('Manager'), function(req, res) {
    try {
        const formData = req.body;
        flightController.getPastFlight(formData, res, req.cookies.userRole);
        
    }
    catch (err) {
        console.log(err);
        res.send("500");
    }
});




module.exports = router;

