const express = require("express");
const router = express.Router();
const flightController = require('../controllers/flight.controller.js');


router.get('/report', function(req, res) {
    try {
        res.render("report", {docTitle: "REPORTS", flights: 0, searchDestination: "", revenue: 0, passengerCount: 0, flightCount: 0, bookingCount: 0, nextFlight: 0});
    } catch (err) {
        console.log(err);
        res.send("500");
    }
});


router.post('/report', function(req, res) {
    try {
        console.log("Route post");
        destination = req.body.destination;
        flightController.getFlightByDestination(destination, res);
  
    } catch (err) {
        console.log(err);
        res.send("500");
    }
});
module.exports = router;

