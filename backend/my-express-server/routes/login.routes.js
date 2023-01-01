const express = require("express");
const router = express.Router();
//registrationController to access RegisteredUser Table
const registrationController = require('../controllers/registration.controller.js');
const checkRole = require('../middleware/auth');
const userDashboardController = require('../controllers/userDashboard.controller.js');

router.get("/login", function(req, res){
  let role = req.cookies.userRole;
  if (role === "user"||role === "Admin"||role === "Manager") {
      // Redirect the user to the user dashboard
      res.redirect("/account");
  } else {
      // Render the home page for guests or users with an unknown role
      res.render("login", {docTitle: "LOGIN", userRole: req.cookies.userRole});
  }

  });

router.post("/login", function(req, res){
    
    registrationController.getUserByEmail(req, res);
});

router.get("/staff_login", function(req, res){
  res.render('staff_login', {docTitle: "STAFF LOGIN", flash: res.locals.flash , userRole: req.cookies.userRole });

});

router.post("/staff_login", function(req, res){
    registrationController.getStaffByEmail(req, res);
});

router.get("/logout", function(req, res){
    res.clearCookie('userRole');
    res.redirect('/');
});

// router.get('/admin', checkRole('Admin'), (req, res) => {
//   // The user is an admin, so allow them to access the route
//   res.send('Welcome to the admin page!');
// });

router.get('/managerDashboard', checkRole('Manager'), (req, res) => {
  // The user is a manager, so allow them to access the route
  res.send('Welcome to the manager page!');
});

router.get('/userDashboard', checkRole('user'), (req, res) => {
  // The user is a user, so allow them to access the route
  try {
          res.send("User Dashboard");
          const formData = req.body;
            userDashboardController.getUserDetails(formData, res);
      
        } catch (err) {
            console.log(err);
            res.send("1500");
        }
});


module.exports = router;
