const express = require('express');
const router = express.Router()
const checkRole = require('../middleware/auth');
const bookingController = require('../controllers/booking.controller');
const responseValues = {
    seatdetail: 0, 
  }

// Default Booking Page
router.get('/booking',checkRole('user'),function(req,res){
    const flightid = req.body;
    try{
        //const flightid = flight_id;
        bookingController.run(flightid,res,req.cookies.userRole);
    }catch(err){
        console.log(err);
        res.send("500");
    }
})

router.post('/booking/flightid',function(req,res){
    const flightid = req.body.flight_id;
    console.log(flightid)
    console.log('User Cookies ' + JSON.stringify(req.cookies.user));
   try{
       //const flightid = flight_id;
       bookingController.run(flightid,res,req.cookies);
   }catch(err){
       console.log(err);
       res.send("500");
   }
})

router.post('/booking/createbooking',bookingController.createbooking);

router.get('/payment',bookingController.getpayment);

router.post('/payment/success',bookingController.paymentSuccess);

router.post('/payment/cancel',bookingController.cancelbooking)

module.exports = router;