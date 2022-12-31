'use strict';


const Booking = require('../models/booking.model');

const responseValues = {
    seatdetail: 0, 
    customerseatdetail : 0
  }

exports.run = (req,res) => {
    try{

        responseValues.seatdetail = [
            {
              booking_id: null,
              passport_no: null,
              flight_id: null,
              seat_id:null,
              seat_price: null,
              discount: null,
              final_price: null,
              booking_status: null,
              booking_date: null
            }
          ];
        console.log(responseValues.seatdetail)
        res.render("booking", { formData: req, docTitle: "BOOKING", data: responseValues, content: 0});
    }catch(err){
        res.send("500");
    }
}

exports.findbyid = (req,res) => {
    try{
        const bid = req.bid;
        Booking.findbyid(bid,(err,result)=>{
            if(err){
                console.log("Model Error"+err);
                res.send("500");
            }else{
                responseValues.seatdetail = result;
                console.log(responseValues)
                res.render("booking", { formData: req, docTitle: "BOOKING", data: responseValues, content:1});

            }
        });
    }catch(err){
        console.log("Controller Error"+err);
        res.send("500");
    }

}

exports.findbycustomerid = (req,res) => {
    try{
        const cid = req.cid;
        Booking.findbycustomerid(cid,(err,result)=>{
            if(err){
                console.log("Model Error"+err);
                res.send("500");
            }else{
                responseValues.customerseatdetail = result;
                console.log(responseValues)
                res.render("booking", { formData: req, docTitle: "BOOKING", data: responseValues, content:2});
            }
        });
    }catch(err){
        console.log("Controller Error"+err);
        res.send(500);
    }

}


/*================================================== NEED TO DO ================================================================*/
/*
const BookingService = require('../../services/BookingServices');

exports.createBooking = (req,res) => {
    try{
        const booking_id = BookingService.createBooking(req.body);
        req.session.booking_id = booking_id.insertbooking;
        return res.status(200).send({result: 'redirect', url: '/payment'});
    }catch(err){
        console.log("Controller Error"+err);
        res.send(500);
    }
}

exports.getPayment = (req, res) => {
        const paymentstatus= Booking.getPaymentStatus(req.session.booking_id)
        if(!paymentstatus || paymentstatus.state==='Paid'){
            return res.status(405).render('405');
        }
        const prices = BookingService.getPrice(req.session.booking_id);
        if (typeof prices === 'undefined') {
            return res.status(405).render('405');
        } else {
            const seat_prices = BookingService.getSeatPrices(req.session.booking_id);

            const discount_percentage = Math.floor(100 - 100 * prices.final_price / prices.price_before_discount);

            res.render('payment', {
                user: req.session.user,
                booking_id: req.session.booking_id,
                seat_prices: seat_prices,
                price: prices.final_price,
                priceBeforeDiscount: prices.price_before_discount,
                discount_percentage: discount_percentage,
                registrationError: req.query.registrationError,
                dbError: req.query.dbError,
                loginError: req.query.loginError,
                regemail: req.query.email,
                regfirstName: req.query.firstName,
                reglastName: req.query.lastName,
                regdob: req.query.dob,
                reggender: req.query.gender,
                regcontactNo: req.query.contactNo,
                regpassportNo: req.query.passportNo,
                regaddressLine1: req.query.addressLine1,
                regaddressLine2: req.query.addressLine2,
                regcity: req.query.city,
                regcountry: req.query.country,
            });
        }
    }

*/























/*



exports.findall = function(req,res){
    Booking.findall(function(err, booking){
        if(err)
        res.send(err);
        console.log('res',booking);
        // res.send(booking);
        res.render("booking", { formData: req, docTitle: "BOOKED", data: responseValues});
    });
};

exports.bookseat = function(req,res){
    const newseat = new Booking(req.body);
    // handle null error
    if(req.body.constructor === Object && Object.keys(req.body).length===0){
        res.status(400).send({error:true,message:'Please provide all required field'});
    }
    else{
        Booking.bookseat(newseat,function(err,booking){
            if(err)
            res.send(err);
            res.json({error:false,message:"Seat booked Successfully!"});
        });
    }
};

exports.cancelbooking = function(req,res){
    Booking.cancelbooking(req.params.Booking_ID,function(err,booking){
        if(err)
        res.send(err);
        res.json({error:false,message: 'Seat cancelled successfully!'});
    });
};

exports.findbycustomerid = function(req,res){
    Booking.findbycustomerid(req.params.Customer_ID,function(err,booking){
        if(err)
        res.send(err);
        res.json(booking);
    });
};




exports.getflightdetail = function(req,res){
    const fs = new Flight_Schedule(req.params.Origin,req.params.Destination,req.params.Departure_Date);
    Booking.getflightdetail(fs,function(err,booking){
        if(err)
        res.send(err);
        res.json(booking);
    });
};
*/

// exports.findbyid = (req,res) => {
//     try{
//         Booking.findbyid(req.params.Booking_ID,function(err,booking){
//             if(err)
//             res.send(err);
//             res.json(booking);
//         });
//     }

// };