const express = require("express");
const router = express.Router();
//flightController to access Flight Table
const flightController = require('../controllers/flight.controller.js');

const responseValues = {
    revenue: 0, 
    passengerCount: 0, 
    flightCount: 0 , 
    bookingCount: 0, 
    nextFlight: 0
  }

//default Page
router.get('/report', function(req, res) {
    try {
        res.render("report", {formData: "", docTitle: "REPORTS", data: responseValues});
    } catch (err) {
        console.log(err);
        res.send("500");
    }
});

router.post('/report/passengerCount', function(req, res) {
    try {
        const formData = req.body;
        flightController.getFlightCount(formData, res);
  
    } catch (err) {
        console.log(err);
        res.send("500");
    }
});
module.exports = router;

