const pool = require("./db.js");

const Flight = function(flight){
    this.FlightID = flight.FlightID;
    this.ArrivalDate = flight.ArrivalDate;
    this.ArrivalTime = flight.ArrivalTime;
    this.DepartureDate = flight.DepartureDate;
    this.DepartureTime = flight.DepartureTime;
    this.AircraftID = flight.AircraftID;
    this.PilotID = flight.PilotID;
    this.Origin = flight.Origin;
    this.Destination = flight.Destination;    
}

Flight.getFlightCount= function(destination,start,end,result){
    sql = "SELECT count(flight_schedule.flight_id) as count FROM flight_schedule left join route on flight_schedule.route_id=route.route_id where route.destination=$1 and flight_schedule.departure_Date between $2 and $3";
    const queryParams = [destination,start,end];
    pool.query(sql,queryParams, function(err,res){
    if(err){
            console.log("error: ",err);
            return result(err,null);
        }
        else{
            console.log("Count: ",res.rows);
            return result(null,res.rows);
        }
    });
};

Flight.getPlaneModelRevenue= function(result){
    sql = "SELECT plane_type.model_name, plane_type.variant, SUM(COALESCE(booking.final_price,0)) "+
    "FROM plane_type "+
    "LEFT JOIN aircraft_instance ON plane_type.model_id=aircraft_instance.model_id "+
    "LEFT JOIN flight_schedule ON aircraft_instance.aircraft_id=flight_schedule.aircraft_id "+
    "LEFT JOIN booking ON flight_schedule.flight_id=booking.flight_id "+
    "GROUP BY plane_type.model_name, plane_type.variant;";
    pool.query(sql, function(err,res){
    if(err){
            console.log("error: ",err);
            return result(err,null);
        }
        else{
            console.log("Revenue Details: ",res.rows);
            return result(null,res.rows);
        }
    });
}

//work in progress
Flight.getBookingCount= function(start,end,result){
    sql = "SELECT COUNT(booking_view.passport_no),  COALESCE(CAST(booking_view.user_type AS character varying(15)) , 'Guest') AS user_type "+
    "FROM booking_view "+
    "WHERE booking_view.booking_date between $1 and $2 "+
    "GROUP BY user_type";
    const queryParams = [start,end];
    pool.query(sql,queryParams, function(err,res){
    if(err){
            console.log("error: ",err);
            return result(err,null);
        }
        else{
            console.log(res);
            console.log("Revenue Details: ",res.rows);
            return result(null,res.rows);
        }
    });
}

Flight.getFlightRoutes= function(result){
    sql = "SELECT route.origin, route.destination from route";
    pool.query(sql, function(err,res){
    if(err){
            console.log("error: ",err);
            return result(err,null);
        }
        else{
            console.log("Route Details: ",res.rows);
            return result(null,res.rows);
        }
    });

}

Flight.getNextFlight= function(origin, destination, result){
    // const current_date = new Date();
    // current_date = current_date.toISOString().slice(0,10);
    // console.log("Current Date: "+current_date);
    sql = "SELECT next_flight_view.booking_id, next_flight_view.passport_no,"+    
    "next_flight_view.flight_id, next_flight_view.seat_ids, next_flight_view.booking_status,"+
    "next_flight_view.booking_date, next_flight_view.age, next_flight_view.departure_date, next_flight_view.flight_status "+
    "FROM next_flight_view "+
    "WHERE next_flight_view.flight_id IN "+
    "(SELECT flight_schedule.flight_id FROM flight_schedule "+
    "LEFT JOIN route on flight_schedule.route_id=route.route_id "+
    "WHERE route.origin=$1 AND route.destination=$2 AND "+
    "flight_schedule.departure_date > CURRENT_DATE LIMIT 1);"
    // "flight_schedule.departure_date > '2020-05-01' LIMIT 1);"
    const queryParams = [origin,destination];
    pool.query(sql, queryParams, function(err,res){
    if(err){
            console.log("error: ",err);
            return result(err,null);
        }
        else{
            console.log("Passenger Details: ",res.rows);
            return result(null,res.rows);
        }
    });
}

Flight.getPastFlight= function(origin, destination, result){
    // const current_date = new Date();
    // current_date = current_date.toISOString().slice(0,10);
    // console.log("Current Date: "+current_date);
    sql = "SELECT next_flight_view.flight_id, COUNT(next_flight_view.passport_no) AS Passenger_Count, "+    
    "next_flight_view.flight_status, next_flight_view.departure_date "+
    "FROM next_flight_view "+
    "WHERE next_flight_view.flight_id IN "+
    "(SELECT flight_schedule.flight_id FROM flight_schedule "+
    "LEFT JOIN route on flight_schedule.route_id=route.route_id "+
    "WHERE route.origin=$1 AND route.destination=$2 AND "+
    "flight_schedule.departure_date < CURRENT_DATE) "+
    "GROUP BY (next_flight_view.flight_id, next_flight_view.flight_status, next_flight_view.departure_date);"
    const queryParams = [origin,destination];
    pool.query(sql, queryParams, function(err,res){
    if(err){
            console.log("error: ",err);
            return result(err,null);
        }
        else{
            console.log("Flight Statistics: ",res.rows);
            return result(null,res.rows);
        }
    });
}

 module.exports = Flight;

