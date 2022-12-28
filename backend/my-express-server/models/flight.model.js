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
    sql = "SELECT plane_type.model_name, plane_type.variant, SUM(booking.final_price) "+
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

 module.exports = Flight;

