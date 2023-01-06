'use strict';


const Booking = require('../models/booking.model');
const Flight = require('../models/flight.model')

const responseValues = {
    seatdetail: 0, 
    customerseatdetail : 0
  }

exports.run = async (req,res, cookies) => {
    try{
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


exports.cancelbooking = async (req,res) => {
    try{
        await Booking.cancelbooking(req.session.booking_id);
        res.redirect('/')
    }catch{
        console.log(error);
        res.redirect('/')
    }

}
