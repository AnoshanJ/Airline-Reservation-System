const pool = require("./db.js");

var Staff_work = function(staffwork){
    this.Staff_ID = staffwork.Staff_ID;
    this.Category = staffwork.Category;
    this.Password = staffwork.Password;
    this.First_Name = staffwork.First_Name;
    this.Last_Name = staffwork.Last_Name;
    this.Contact = staffwork.Contact;
    this.Email = staffwork.Email;
    this.DOB = staffwork.DOB;
    this.Gender = staffwork.Gender;
    this.Assigned_Airport = staffwork.Assigned_Airport;
    this.Country = staffwork.Country;
}

Staff_work.getStaffByEmail = function (email, result) {
    const sql = "SELECT * FROM staff WHERE email = $1";
    const queryParams = [email];
    pool.query(sql, queryParams, function (err, res) {
        if (err) {
            console.log("error: ", err);
            return result(err, null);
        } else {
            console.log("Retrieved user: ", res.rows);
            return result(null, res.rows);
        }
    });
};

Staff_work.getbystateFlights = function(state,result){
    pool.query("SELECT flight_id,aircraft_id,departure_date,departure_time,arrival_date,arrival_time,Duration,Origin,Destination FROM flight_schedule LEFT OUTER JOIN route USING(route_id) WHERE Flight_Schedule.Flight_Status =$1",[state],function(err,res){
        if(err){
            console.log("error: ",err);
            result(err,null);
        }
        else{
            result(null,res.rows);
        }
    });
};

module.exports = Staff_work;

