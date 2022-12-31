const express = require('express');
const router = express.Router()

const bookingController = require('../controllers/booking.controller');

const responseValues = {
    seatdetail: 0, 
  }

// Default Booking Page
router.get('/booking', function(req, res) {
    
    try {
        const formData = req.body;
        bookingController.run(formData,res);
    } catch (err) {
        console.log(err);
        res.send("500");
    }
});


// Retreive a single booked seat by Booking_ID
router.post('/booking/geatseat_bookid',function(req,res){
    try{
        const formData = req.body;
        bookingController.findbyid(formData,res);
    }catch(err){
        console.log(err);
        res.send("500");
    }
});


router.post('/booking/getseat_customid',function(req,res){
    try{
        const formData = req.body;
        bookingController.findbycustomerid(formData,res);
    }catch(err){
        console.log(err);
        res.send("500");
    }
});


/*================================================== NEED TO DO ================================================================*/
/*

router.post('/booking/createbooking',bookingController.createBooking);

router.get('/payment', bookingController.getPayment);

*/

/*

// Book a new seat
router.post('booking/bookseat',bookingController.bookseat);

// Cancel a booked_seat
router.delete('/cancelseat/:Booking_ID',bookingController.cancelbooking);

// router.get('getflightdetail/:Origin,Destination,Departure_Date',bookingController.getflightdetail);
*/
module.exports = router;