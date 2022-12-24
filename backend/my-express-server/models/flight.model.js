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

Flight.findbyDestination = (destination, result) => {
    sql = "SELECT * FROM flight WHERE Destination = ?";
    con.query(sql, [destination], function(err, res) {
      if (err) {
        console.log("error: ", err);
        return result(err, null);
      }
      if (res.length) {
        console.log("Flight: ", res);
        return result(null, res);
      }
      result({ kind: "not_found" }, null);
    });
  };
  module.exports = Flight;