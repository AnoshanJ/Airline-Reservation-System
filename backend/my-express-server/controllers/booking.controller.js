'use strict';


const Booking = require('../models/booking.model');
const Flight = require('../models/flight.model')

const responseValues = {
    seatdetail: 0, 
    customerseatdetail : 0
  }

exports.run = async (req,res, cookies) => {
    try{
        console.log("===========",cookies);
        const flightInfo = await Booking.getflightinfo(req);
        const seat_info = await Booking.getseats(req);
        var arrlst = new Array();
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
          console.log("Capacities : ",seat_info[0]);
          console.log("Booked seats : ",seat_info[1]);
          console.log("Model Id : ",seat_info[2]);
          console.log('User Cookies ' + JSON.stringify(cookies.userRole));
          console.log("Flight_info",flightInfo[0]);
          console.log("Seat price",flightInfo[1]);

        res.render("booking", {lst:arrlst ,flightInfo:flightInfo ,seat_info:seat_info, formData: req, docTitle: "BOOKING", data: responseValues, content: 0, userdetail: cookies});
    }catch(err){
        res.send("500");
    }
}

exports.createbooking = async (req,res)=>{
    try{
        const formData = req;
        let book_id = await Booking.createbooking(req.body);
        console.log("formData.body : ",formData.body);
        req.session.booking_id = book_id;
        req.session.formData = formData.body;
        console.log("booking_id : ",book_id);
        return res.redirect("/payment")
    } catch (err){
        console.log(err)
        res.send(500);
    }
}

exports.getpayment = async (req,res) => {
    try{
        const booking_status = await Booking.getpaymentstatus(req.session.booking_id);
        if(booking_status.status ==='Paid'){
            return res.status(405).render('405');
        }
        const prices = await Booking.getprice(req.session.booking_id);
        if(typeof prices === 'undefined'){
            return res.status(405).render('405');
        }else{
            console.log("prices :  ",prices);
            console.log('req.session.formData :',req.session.formData);
            console.log('req.session.booking_id :',req.session.booking_id);
            
            res.render('payment',{
                docTitle: "PAYMENT",
                booking_id: req.session.booking_id,
                bookingstatus: booking_status.status,
                initprices: prices.seat_price,
                finalprice : prices.final_price,
                formData:req.session.formData
            })
        }
    }catch(err){
        console.log("ERROR : ",err);
        return res.redirect('/booking/payment')
    }
}


exports.getbooking = (req,res)=>{
    try{
        let Flight_ID;
        if(typeof req.body.Flight_ID !== 'undefiened'){
            Flight_ID = req.body.Flight_ID;
        }
        else{
            Flight_ID = req.query.Flight_ID;
        }

        const flightInfo = Booking.getflightinfo(Flight_ID);
        const seat_info = Booking.getseats(Flight_ID);
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

        res.render('booking',{
            Flight_ID,
            user : req.session.user,
            seat_info,
            firstname : req.query.firstname,
            lastname : req.query.lastname,
            dob : req.query.dob,
            gender : req.query.gender,
            mobile : req.query.mobile,
            Passport_no : req.query.Passport_no,
            email : req.query.email,
            flightinfo : flightInfo[0],
            priceinfo: flightInfo[1],
            formData: req, 
            docTitle: "BOOKING", 
            data: responseValues, 
            content: 0,
            userRole: cookies 
        })
    }catch(err){
        console.log("Controller Error"+err);
        res.send(500);
    }
}

exports.paymentSuccess = async (req, res) => {
    try {
        await Booking.successbooking(req.session.booking_id);
        const bookingDetails = await Booking.getbookingdetails(req.session.booking_id);
        const flight_id=bookingDetails[0].flight_id;
        const flight_details = await Booking.getflightinfo(flight_id);
        console.log("==========================",bookingDetails[0]);
        console.log("++++++++++++++++++++++++++",bookingDetails[1]);
        
        console.log("0000000000000000000",req.session.formData)
        res.render('payment_successful', {
            docTitle:"Eticket",
            flight_details,
            bookingDetails: bookingDetails,
            formData:req.session.formData
        });
    } catch (error) {
        console.log(error);
        return res.redirect('/booking/payment');
    }
}

/*
static async deleteBooking(req, res) {
    try {
        await BookingService.cancelBooking(req.body.booking_id);
        return res.status(200).send({ result: 'redirect', url: '/' });
    } catch (error) {
        console.log(error);
        return res.status(200).send({ result: 'redirect', url: '/' });
    }
}*/

exports.cancelbooking = async (req,res) => {
    try{
        await Booking.cancelbooking(req.session.booking_id);
        res.redirect('/')
    }catch{
        console.log(error);
        res.redirect('/')
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