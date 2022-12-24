'use strict';

const Booking = require('../models/booking.model');

exports.findall = function(req,res){
    Booking.findall(function(err, booking){
        console.log('controller');
        if(err)
        res.send(err);
        console.log('res',booking);
        res.send(booking);
    });
};

exports.bookseat = function(req,res){
    const newseat = new Booking(req.body);
    // console.log(Object.keys(req.body))
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


exports.findbyid = function(req,res){
    Booking.findbyid(req.params.Booking_ID,function(err,booking){
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