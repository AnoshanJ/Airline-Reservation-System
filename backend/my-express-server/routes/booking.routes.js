const express = require('express');
const router = express.Router()

const bookingController = require('../controllers/booking.controller');


// router.get('/', function(req, res) {
//     try {
//         res.render("booking", {docTitle: "BOOKING"});
//     } catch (err) {
//         console.log(err);
//         res.send("500");
//     }
// });

// Retrieve all booked seats
router.get('/getall',bookingController.findall);

// Book a new seat
router.post('/bookseat',bookingController.bookseat);

// Retreive a single booked seat by Booking_ID
router.get('/geatseat_bookid/:Booking_ID',bookingController.findbyid);

// Retreive booked seat by Customer_ID
router.get('/getseat_customid/:Customer_ID',bookingController.findbycustomerid);

// Cancel a booked_seat
router.delete('/cancelseat/:Booking_ID',bookingController.cancelbooking);

// router.get('getflightdetail/:Origin,Destination,Departure_Date',bookingController.getflightdetail);

module.exports = router;