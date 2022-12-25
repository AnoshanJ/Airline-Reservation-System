const con = require("./db.js");

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

 module.exports = Flight;

