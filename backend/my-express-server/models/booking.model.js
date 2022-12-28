'use strict';

// var mysql = require('mysql2');
// const config = require("./../config/config.js");

// var con = mysql.createConnection(config.db);
const con = require("./db.js");

// Booking object create
var Booking = function(booking){
    this.Customer_ID = booking.Customer_ID;
    this.FlightSchedule_ID = booking.FlightSchedule_ID;
    this.seat_name = booking.seat_name;
    this.Seat_Price = booking.Seat_Price;
    this.Discount = booking.Discount;
    this.Final_Price = booking.Final_Price;
    this.Booking_Status = booking.Booking_Status;
    this.Booking_Date = new Date();
};

Booking.bookseat = function(newseat, result){
    console.log(newseat)
    // con.query("select Seat_Price.price from Flight_Schedule left join Route on Route.Route_ID = Flight_Schedule.Route_ID left join Seat_Price on Seat_Price.Route_ID= Route.Route_ID  WHERE Route.Route_ID = (Select Route_ID from Flight_Schedule where Flight_Schedule.FlightSchedule_ID = ?) and Seat_Price.class_ID in (select Traveller_Class_ID from Aircraft_Seat where Seat_Price.class_ID = '1')",[booking.FlightSchedule_ID],function(err,res){
    //     if(err){
    //         console.log("error: ", err);
    //         result1(err, null);
    //     }
    //     else{
    //         sp = result1;
    //     }
    // });
    // var dis = 0.1;
    // var fp = sp - sp*dis;
    // con.query("INSERT INTO booking SET Customer_ID=? ,FlightSchedule_ID=? ,seat_name=? ,Seat_Price=?, Discount=?, Final_Price=?",[booking.Customer_ID,booking.FlightSchedule_ID,booking.seat_name,sp,booking.Discount,fp], function(err,res){
        con.query("INSERT INTO booking SET ?",newseat, function(err,res){
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null,res.insertId);
        }
    });   
};


// Flight_Schedule.getflightdetail = function(from,to,date,result){
//     con.query("SELECT Flight_Schedule.FlightSchedule_ID FROM Flight_Schedule LEFT JOIN Route on Route.Route_ID = Flight_Schedule.Route_ID where Route.Origin=$1 and Route.Destination=$2 and Flight_Schedule.Departure_Date = $3",from,to,date,function(err,res){
//         if(err){
//             console.log("error: ",err);
//             result(err,null);
//         }
//         else{
//             result(null,res);
//         }
//     });
// };

Booking.findbyid = function(bid, result){
    con.query("SELECT * FROM booking WHERE Booking_ID = ?",bid,function(err,res){
        if(err){
            console.log("error: ",err);
            result(err,null);
        }
        else{
            result(null,res);
        }
    });
};

Booking.findbycustomerid = function(cid,result){
    con.query("SELECT * FROM booking WHERE Customer_ID = ?",cid,function(err,res){
        if(err){
            console.log("error: ",err);
            result(err,null);
        }
        else{
            result(null,res);
        }
    });
};

Booking.findall = function(result){
    con.query("SELECT * FROM booking", function(err,res){
        if(err){
            console.log("error: ",err);
            result(err,null);
        }
        else{
            result(null,res);
        }
    });
};

Booking.cancelbooking = function(id,result){
    con.query("DELETE FROM booking WHERE Booking_ID = ?", [id],function(err,res){
        if(err){
            console.log("error: ",err);
            result(err,null);
        }
        else{
            result(null,res);
        }
    });
};

module.exports= Booking;