const pool = require('./db.js');

const Managerdetails = function(manager){
    this.Staff_ID = staff.Staff_ID;
    this.Category = staff.Category;
    this.Password = staff.Password;
    this.First_Name = staff.First_Name;
    this.Last_Name = staff.Last_Name;
    this.Contact = staff.Contact;
    this.Email = staff.Email;
    this.DOB = staff.DOB;
    this.Gender = staff.Gender;
    this.Assigned_Airport = staff.Assigned_Airport;
    this.Country = staff.Country;
}

Managerdetails.getStaffByEmail = function(email,result){
    const sql = "SELECT password,Category,First_Name,Last_Name,Contact,DOB,Email,Gender,Assigned_Airport,Country FROM Staff WHERE email = $1";
    const queryParams = [email];
    pool.query(sql,queryParams,function(err,res){
        if (err) {
            console.log("error: ", err);
            return result(err,null);
        } else {
            console.log("Retrieved Staff: ", res.rows[0]);
            return result(null,res.rows);
        }
    });
  };

module.exports = Managerdetails;