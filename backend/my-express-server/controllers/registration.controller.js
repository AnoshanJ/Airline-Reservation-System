const bcrypt = require("bcrypt");
const saltRounds = 10;
const RegisteredUser = require("../models/registeredUser.model.js");
const Staff = require("../models/staff_work.model.js");
const userDashboard = require("../models/userDashboard.model.js");

exports.getUserByEmail = (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const email = req.body.email;
  const password = req.body.password;

  // Check if email and password match those of a registered user
  RegisteredUser.getUserByEmail(email, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error retrieving user" });
      return;
    }

    if (data.length === 0) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    // Check if password matches
      bcrypt.compare(password, data[0].password, function (err, result) {
 
        if (result) {
        // Set the user's role in the session and in a cookie
        req.session.userRole = data[0].category;
        res.cookie('userRole', 'data[0].category', { maxAge: 900000, httpOnly: true });
        console.log(req.session.userRole);

        //res.render("userDashboard", { formData: req, docTitle: "Details of the user",title:"User Dashboard", sampleData : result,action:'list',});

          const email = req.body.email;
    
          userDashboard.getUserDetails(email,(err, result) => {
          if (err) {
            console.log("Model Error"+err);
            res.send("2500");
          } else {
            //responseValues.revenue = result;
            res.render("userDashboard", { formData: req, docTitle: "",title:"User Dashboard", sampleData : result,action:'list',});
            console.log("userDashboard controller")
          }
        });  
        
        return;
        }
        else {        
          req.flash('error', 'Incorrect password');
          res.redirect('/login');
          return;
        }

    });
    
  });
};

exports.getStaffByEmail = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const email = req.body.email;
  const password = req.body.password;

  // Check if email and password match those of a registered user
  Staff.getStaffByEmail(email, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error retrieving user" });
      return;
    }

    if (data.length === 0) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    // Check if password matches
      bcrypt.compare(password, data[0].password, function (err, result) {
 
        if (result) {
        // Set the user's role in the session and in a cookie
        req.session.userRole = data[0].category;
        res.cookie('userRole', 'data[0].category', { maxAge: 900000, httpOnly: true });
        console.log(req.session.userRole);
        res.redirect('/managerDashboard');
        return;
        }
        else {        
          req.flash('error', 'Incorrect password');
          res.redirect('/staff_login');
          return;
        }

    });
    
  });
};

exports.createRegisteredUser = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    // Create a new registered user
    const registeredUser = new RegisteredUser({
      password: hash,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      dob: req.body.date_of_birth,
      email: req.body.email,
      mobile: req.body.mobile,
      user_type: req.body.user_type,
      address: req.body.address,
      country: req.body.country,
      passport_no: req.body.passport_no,
      no_of_bookings: 0,
      display_photo: req.body.display_photo,
    });


    // Save registered user in the database
    RegisteredUser.createUser(registeredUser, (err, data) => {
      if (err) {

        res.status(500).send("<p>There was an error creating the user. Redirecting to registration page in 3 seconds...</p>" +
          "<script>setTimeout(function () { window.location.href = '/register'; }, 3000);</script>");
      }
      else {
        // Display a successful creation box
        res.send("<p>User created successfully! Redirecting to login page in 3 seconds...</p>" +
          "<script>setTimeout(function () { window.location.href = '/login'; }, 3000);</script>");
      }
    });

  });


}
