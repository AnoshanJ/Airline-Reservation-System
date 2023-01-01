const Flight = require("../models/flight.model.js");

  const responseValues = {
    revenue: 0, 
    passengerCount: 0, 
    flightCount: 0 , 
    bookingCount: 0, 
    nextFlight: 0,
    pastFlight: 0,
    route : 0
  }

  exports.getDetails = async (req, res, cookies) => {
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
        data: responseValues,
        userRole: cookies

      });
    } catch (err) {
      console.log("Controller Error" + err);
      res.send("500");
    }
  };
  

  exports.getFlightCount = (req, res, cookies) => {
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
          res.render("report", { formData: req, docTitle: "REPORTS", data: responseValues, userRole: cookies});

        }
      });
    } catch (err) {
      console.log("Controller Error"+err);
      res.send("500");

    }
  }

  exports.getBookingCount = (req, res, cookies) => {
    try { 

      const start = req.start2;
      const end = req.end2;
         
      Flight.getBookingCount(start,end, (err, result) => {
        if (err) {
          console.log("Model Error: "+err);
          res.send("500");
        } else {
          console.log(result);
          // EDIT
          responseValues.bookingCount = result;
          console.log(responseValues);
          res.render("report", { formData: req, docTitle: "REPORTS", data: responseValues, userRole: cookies});
  
        }
      });
    } catch (err) {
      console.log("Controller Error: "+err);
      res.send("500");
    }
  }

  exports.getNextFlight = (req, res, cookies) => {
    try { 
      const route = req.route;
      const [origin, destination] = route.split(" to ");
      console.log(origin, destination);
      Flight.getNextFlight(origin,destination,(err, result) => {
        if (err) {
          console.log("Model Error: "+err);
          res.send("500");
        } else {
          responseValues.nextFlight = result;
          res.render("report", { formData: req, docTitle: "REPORTS", data: responseValues, userRole: cookies});

        }
      });
    } catch (err) {
      console.log("Controller Error: "+err);
      res.send("500");

    }
  }

  exports.getPastFlight = (req, res, cookies) => {
    try { 
      const route = req.route2;
      const [origin, destination] = route.split(" to ");
      console.log(origin, destination);
      Flight.getPastFlight(origin,destination,(err, result) => {
        if (err) {
          console.log("Model Error: "+err);
          res.send("500");
        } else {
          responseValues.pastFlight = result;
          res.render("report", { formData: req, docTitle: "REPORTS", data: responseValues, userRole: cookies});

        }
      });
    } catch (err) {
      console.log("Controller Error: "+err);
      res.send("500");

    }
  }
