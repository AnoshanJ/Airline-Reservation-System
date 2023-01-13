const bcrypt = require("bcrypt");
const saltRounds = 10;
const managerDashboard = require("../models/staff.model.js");

exports.getmanagerdetails = (req,res) =>{
    try{
        managerDashboard.getStaffByEmail(req.body.email,(req,res)=>{
            if(err){
                console.log("Model Error"+err);
                res.send("2500");
            }
            else {
                res.render("managerDashboard", { formData: req, docTitle: "Details of the Manager",title:"Manager Dashboard", sampleData : result,action:'list',});
                console.log("Manager controller")
            }
        })
    }catch(err){
        console.log("Controller Error"+err);
        res.send("3500");        
    }
}

exports.firestaff = (req,res) => {
    try{
        managerDashboard.firestaff(req.body.email,req.body.Category,(req,res)=>{
            if(err){
                console.log("Model Error"+err);
                res.send("2500");
            }
            else{
                res.render("managerDashboard",{formData: req,docTitle: "Details of the Manager",title:"Manager Dashboard", sampleData : result,action:'list',});
                console.log("Manager Controller")
            }
        })
    }catch(err){
        console.log("Controller Error"+err);
        res.send("3500");   
    }
}

exports.addstaff = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    bcrypt.hash(req.body.Password, saltRounds, function (err, hash) {
      // Create a new registered Staff
      const registerstaff = new managerDashboard({
        Category: req.body.Category,
        Password: hash,
        First_Name: req.body.First_Name,
        Last_Name: req.body.Last_Name,
        Contact: req.body.Contact,
        Email: req.body.Email,
        DOB: req.body.DOB,
        Gender: req.body.Gender,
        Assigned_Airport: req.body.Assigned_Airport,
        Country: req.body.Country
      });
  
      // Add Staff in the database
      managerDashboard.registerstaff(registerstaff, (err, data) => {
        if (err) {
  
          res.status(500).send("<p>There was an error creating the staff. Redirecting to manager dashboard in 3 seconds...</p>" +
            "<script>setTimeout(function () { window.location.href = '/managerdashboard'; }, 3000);</script>");
        }
        else {
          // Display a successful creation box
          res.send("<p>staff Added successfully...</p>" +
            "<script>setTimeout(function () { window.location.href = '/managerdashboard'; }, 3000);</script>");
        }
      });
  
    });
  
  
  };