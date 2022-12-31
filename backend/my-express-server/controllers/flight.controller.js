const Flight = require("../models/flight.model.js");

  const responseValues = {
    revenue: 0, 
    passengerCount: 0, 
    flightCount: 0 , 
    bookingCount: 0, 
    nextFlight: 0,
    route : 0
  }

  exports.getDetails = async (req, res) => {
    try {
      responseValues.revenue = await new Promise((resolve, reject) => {
        Flight.getPlaneModelRevenue((err, result) => {
          if (err) {
            console.log("Model Error" + err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
      responseValues.route = await new Promise((resolve, reject) => {
        Flight.getFlightRoutes((err, result) => {
          if (err) {
            console.log("Model Error" + err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      res.render("report", {
        formData: req,
        docTitle: "REPORTS",
        data: responseValues

      });
    } catch (err) {
      console.log("Controller Error" + err);
      res.send("500");
    }
  };
  

  exports.getFlightCount = (req, res) => {
    try { 
      const destination = req.destination;
      const start = req.start;
      const end = req.end;
         
      Flight.getFlightCount(destination,start,end, (err, result) => {
        if (err) {
          console.log("Model Error"+err);
          res.send("500");
        } else {
          responseValues.passengerCount = String(result[0].count);
          res.render("report", { formData: req, docTitle: "REPORTS", data: responseValues});
        }
      });
    } catch (err) {
      console.log("Controller Error"+err);
      res.send("500");
    }
  }



