// const userDashboard = require("../models/userDashboard.model.js");
// const registrationController = require('../controllers/registration.controller.js');


// exports.getUserDetails = (req, res) => {
//     try { 
//       registrationController.getUserByEmail = (req,res)=> {
//         const email = req.body.email;

//         userDashboard.getUserDetails(email,(err, result) => {
//         if (err) {
//           console.log("Model Error"+err);
//           res.send("2500");
//         } else {
//           //responseValues.revenue = result;
//           res.render("userDashboard", { formData: req, docTitle: "Details of the user",title:"User Dashboard", sampleData : result,action:'list',});
//           console.log("userDashboard controller")
//         }
//       });  
//       }

//     } catch (err) {
//       console.log("Controller Error"+err);
//       res.send("3500");
//     }
//   }