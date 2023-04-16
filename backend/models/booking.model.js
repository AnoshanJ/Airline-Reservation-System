
const pool = require("./db.js");

// Booking object create
var Booking = function(booking){
    this.Booking_ID=booking.Booking_ID;
    this.Passport_no = booking.Passport_no;
    this.Flight_ID = booking.Flight_ID;
    this.Seat_ID = booking.Seat_ID;
    this.Model_ID = booking.Model_ID;
    this.Seat_Price = booking.Seat_Price;
    this.Discount = booking.Discount;
    this.Final_Price = booking.Final_Price;
    this.Booking_Status = booking.Booking_Status;
    this.Booking_Date = new Date();
};

Booking.getpaymentstatus = async function(bookingid){
    console.log("let see",bookingid)
    let status = await pool.query("SELECT booking_status FROM Booking WHERE booking_id=$1",[bookingid]);
    console.log("status :::::",status.rows[0])
    return status.rows[0];
}

Booking.getprice = async function(bookingid){
    let prices = await pool.query("SELECT seat_price,final_price FROM Booking WHERE booking_id=$1",[bookingid]);
    return prices.rows[0];
}

Booking.createbooking = async function(newseat){
    let booking_id = await pool.query("SELECT insertbooking($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",[newseat.Passport_no,newseat.Flight_ID,newseat.Passport_name,newseat.Passno,newseat.passDOB,newseat.seatNo,newseat.firstname,newseat.lastname,newseat.gender,newseat.dob,newseat.email,newseat.mobile,newseat.custtype]);
    console.log("booking id = ",booking_id.rows[0].insertbooking)
    return booking_id.rows[0].insertbooking;
}

Booking.getseats = async function(Flight_ID){
    let capacities = await pool.query("SELECT Economy_Seat_Capacity, Business_Seat_Capacity, Platinum_Seat_Capacity, E_seats_per_row, B_seats_per_row, P_seats_per_row FROM Plane_Type NATURAL JOIN Flight_Schedule WHERE Flight_ID = $1",[Flight_ID]);
    let booked_seat = await pool.query("SELECT seat_id FROM Passenger_Seat LEFT JOIN Booking on Passenger_Seat.booking_id=Booking.booking_id Where Flight_ID=$1",[Flight_ID]);
    let model_id = await pool.query("SELECT model_id FROM Aircraft_Instance NATURAL JOIN Flight_Schedule WHERE Flight_ID=$1",[Flight_ID]);
    return [capacities.rows[0],booked_seat.rows,model_id.rows[0]];
}

Booking.getflightinfo = async function(Flight_ID){
    let flightinfo = await pool.query("SELECT Flight_ID,Route_ID, Departure_Date, Departure_Time, Arrival_Date, Arrival_Time, Route.Origin, Route.Destination, Route.Duration FROM Flight_Schedule NATURAL JOIN Route WHERE Flight_ID=$1",[Flight_ID]);
    let priceinfo = await pool.query("SELECT Class_ID, price FROM Seat_Price WHERE Route_ID=$1",[flightinfo.rows[0].route_id]);
    console.log("Flight info = ",flightinfo.rows[0])
    return [flightinfo.rows[0],priceinfo.rows];        
}


Booking.getbookingdetails = async function(booking_id){
    let query = await pool.query("SELECT passenger_seat.name,passenger_seat.passport_no,passenger_seat.seat_id,booking.flight_id,booking.booking_date,plane_type.model_name,plane_type.variant,Route.origin,Route.Destination,Flight_Schedule.departure_date,Flight_Schedule.departure_time,Flight_Schedule.arrival_date,Flight_Schedule.arrival_time FROM booking left join passenger_seat on booking.booking_id=Passenger_seat.booking_id LEFT JOIN plane_type ON plane_type.model_id=booking.model_id LEFT JOIN Flight_Schedule ON Flight_Schedule.flight_id=booking.flight_id LEFT JOIN Route ON FLight_Schedule.route_id=Route.route_id WHERE booking.booking_id=$1",[booking_id]);
    console.log("Booking details : ",query.rows);
    return query.rows;
}




Booking.successbooking = async function(booking_id){
    let query = await pool.query("UPDATE Booking SET booking_status = 'Paid' WHERE booking_id=$1",[booking_id]);
}

Booking.cancelbooking = async function(booking_id){
    let query = await pool.query("DELETE FROM Booking WHERE booking_id=$1 and booking_status = 'Not paid'",[booking_id]);
}


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