const pool = require("./db.js");

const UserDetails = function(userDetails){
 
    this.first_name = userDetails.first_name;
    this.last_name = userDetails.last_name;
    this.gender = userDetails.gender;
    this.dob = userDetails.dob;
    this.email = userDetails.email;
    this.mobile = userDetails.mobile;
    this.user_type = userDetails.user_type;
    this.address = userDetails.address;
    this.country = userDetails.country;
    this.passport_no = userDetails.passport_no;
    this.no_of_bookings = userDetails.no_of_bookings;
    this.joined = userDetails.joined;
    this.display_photo = userDetails.display_photo;
}
UserDetails.getUserDetails = function (email,result) {
    const sql = "SELECT first_name,last_name,gender,dob,email,mobile,user_type,address,country,passport_no,no_of_bookings,joined,display_photo FROM registered_customer_account WHERE email = $1";
    const queryParams = [email];
    pool.query(sql,queryParams, function(err,res){
        if(err){
                console.log("error: ",err);
                return result(err,null);
            }
            else{
                console.log("User Details: ",res.rows);
                return result(null,res.rows);
            }
        });
};

module.exports = UserDetails;