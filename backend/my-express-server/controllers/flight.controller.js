const Flight = require("../models/flight.model.js");

exports.getFlightByDestination = (destination, res) => {
    try {
      console.log("Destination: " + destination);
      Flight.findbyDestination(destination, (err, result) => {
        if (err) {
          console.log(err);
          res.render("report", { docTitle: "REPORTS", flights: [], searchDestination: destination });
        } else {
          console.log("FLIGHT: " + result);
          res.render("report", { docTitle: "REPORTS", flights: result, searchDestination: destination });
        }
      });
    } catch (err) {
      console.log(err);
      res.send("Controller ERROR");
    }
  };
