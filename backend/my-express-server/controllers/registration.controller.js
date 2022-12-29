const RegisteredUser = require("../models/registeredUser.model.js");

exports.createRegisteredUser = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a new registered user
  const registeredUser = new RegisteredUser({
    password: req.body.password,
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
    if (err){

      res.status(500).send("<p>There was an error creating the user. Redirecting to registration page in 3 seconds...</p>" +
      "<script>setTimeout(function () { window.location.href = '/register'; }, 3000);</script>");
    }
    else {
// Display a successful creation box
res.send("<p>User created successfully! Redirecting to login page in 3 seconds...</p>" +
"<script>setTimeout(function () { window.location.href = '/login'; }, 3000);</script>");
}
});

}
