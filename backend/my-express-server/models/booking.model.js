
const pool = require("./db.js");

// Booking object create
var Booking = function(booking){
    // this.Booking_ID=booking.Booking_ID;
    this.Customer_ID = booking.Customer_ID;
    this.FlightSchedule_ID = booking.FlightSchedule_ID;
    this.seat_name = booking.seat_name;
    this.Seat_Price = booking.Seat_Price;
    this.Discount = booking.Discount;
    this.Final_Price = booking.Final_Price;
    this.Booking_Status = booking.Booking_Status;
    this.Booking_Date = new Date();
};
/*
Booking.bookseat = function(newseat, result){
    console.log(newseat)
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
*/


Booking.findbyid = function(bid, result){
    pool.query("SELECT * FROM booking WHERE Booking_ID = $1",[bid],function(err,res){
        if(err){
            console.log("error: ",err);
            result(err,null);
        }
        else{
            result(null,res.rows);
        }
    });
};

Booking.findbycustomerid = function(cid,result){
    pool.query("SELECT * FROM booking WHERE passport_no = $1",[cid],function(err,res){
        if(err){
            console.log("error: ",err);
            result(err,null);
        }
        else{
            result(null,res.rows);
        }
    });
};

/*================================================== NEED TO DO ================================================================*/
/*

Booking.createBooking = function(values){
    const query = 'SELECT insertBooking($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)';
    let booking_id = pool.query(query,[values.custID, values.schedule_id, values.passName, values.passPassport, values.passDob, values.seatNo, values.custName, values.address, values.custDob, values.custGender, values.custPassport, values.mobile, values.custEmail, values.custType]);
    return booking_id.rows[0];
}

Booking.getPrice = function(booking_id){
    const query = 'SELECT price_before_discount, final_price FROM seat_booking WHERE booking_id = $1';
    let price = pool.query(query,[booking_id]);
    return price.rows[0];
}

Booking.getSeatPrices = function(booking_id){
    const query = 'SELECT seat_id, price FROM passenger_seat WHERE booking_id = $1';
    let seat_prices = pool.query(query,[booking_id]);
    return seat_prices.rows;
}

Booking.getPaymentStatus = function(booking_id){
    const query = 'SELECT state FROM Seat_Booking WHERE booking_id=$1';
    let result = pool.query(query,[booking_id]);
    return result.rows[0];
}

Booking.getSeats = function(flight_id) {
    const query_1 = 'SELECT economy_seat_capacity, business_seat_capacity, platinum_seat_capacity, e_per_row, b_seats_per_row, p_seats_per_row FROM plane_type NATURAL JOIN aircraft_instance NATURAL JOIN flight_schedule WHERE flight_id=$1';
    const capacities = pool.query(query_1, [flight_id]);

    const query_2 = 'SELECT seat_id FROM booking NATURAL JOIN passenger_seat WHERE flight_id=$1';
    const booked_seats = pool.query(query_2, [flight_id]);

    const query_3 = 'SELECT model_id FROM aircraft_instance NATURAL JOIN flight_schedule WHERE flight_id=$1';
    const model_id = pool.query(query_3, [flight_id]);

    return [capacities.rows[0], booked_seats.rows, model_id.rows[0]];
}
*/








/*
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

Booking.passengerdetails= function(fnameinput,lnameinput,passportinput,phoneinput,gender,address,email,bookingdate,result){
    sql = "SELECT count(flight.Flight_ID) as count FROM flight where flight.Destination=? and Flight.Departure_Date between ? and ?";
    con.query(sql,[destination,start,end],function(err,res){
    if(err){
            console.log("error: ",err);
            return result(err,null);
        }
        else{
            console.log("Count: ",res);
            return result(null,res);
        }
    });
};

*/
module.exports= Booking;