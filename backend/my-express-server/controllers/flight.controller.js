const Flight = require("../models/flight.model.js");

exports.getFlightByDestination = (destination, res) => {
    try {
      console.log("Destination: " + destination);
      Flight.findbyDestination(destination, (err, result) => {
        if (err) {
          console.log(err);
          res.render("report", { docTitle: "REPORTS", flights: [], searchDestination: destination, revenue: 0, passengerCount: 0, flightCount: 0 , bookingCount: 0, nextFlight: 0});
        } else {
          console.log("FLIGHT: " + result);
          res.render("report", { docTitle: "REPORTS", flights: result, searchDestination: destination, revenue: 0, passengerCount: 0,  flightCount: 0, bookingCount: 0, nextFlight: 0});
        }
      });
    } catch (err) {
      console.log(err);
      res.send("Controller ERROR");
    }
  };
