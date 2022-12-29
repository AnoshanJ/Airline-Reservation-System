const Search = require("../models/search.model.js");
exports.getFlightSchedule = (req, res) => {
    try { 

        Search.getFlightSchedule((err, result) => {
        if (err) {
          console.log("Model Error"+err);
          res.send("500");
        } else {
          //responseValues.revenue = result;
          res.render("search", { formData: req, docTitle: "SEARCH",title:"Search Your Flight", sampleData : result,action:'list',});
        }
      });
    } catch (err) {
      console.log("Controller Error"+err);
      res.send("500");
    }
  }