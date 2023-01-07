const pool = require("./db.js");

var Staff_work = function(staffflightwork){
    this.flight = staffflightwork.flight_id;
    this.model_name = staffflightwork.model_name;
    this.Model_ID = staffflightwork.Model_ID;
    this.variant = staffflightwork.variant;
    this.Manufacturer = staffflightwork.manufacturer;
    this.Economy_Seat_Capacity = staffflightwork.economy_seat_capacity;
    this.Business_Seat_Capacity = staffflightwork.business_seat_capacity;
    this.Platinum_Seat_Capacity = staffflightwork.platinum_seat_capacity;
    this.E_seats_per_row = staffflightwork.e_seats_per_row;
    this.B_seats_per_row = staffflightwork.b_seats_per_row;
    this.P_seats_per_row = staffflightwork.p_seats_per_row;
    this.max_load = staffflightwork.max_load;
    this.fuel_capacity = staffflightwork.fuel_capacity;
    this.Aircraft_ID = staffflightwork.Aircraft_ID;
    this.Airline_Name = staffflightwork.Airline_Name;
    this.Aircraft_Status = staffflightwork.Aircraft_Status;
    this.Maintenance_Date = staffflightwork.Maintenance_Date;
    this.Purchase_Date = staffflightwork.Purchase_Date;
}

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

Staff_work.addnewplanetype = function (newplanetype,result) {
    pool.query("INSERT INTO Plane_Type(Model_Name, variant, Manufacturer, Economy_Seat_Capacity, Business_Seat_Capacity, Platinum_Seat_Capacity, E_seats_per_row, B_seats_per_row, P_seats_per_row, max_load, fuel_capacity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",[newplanetype.model_name,newplanetype.variant,newplanetype.Manufacturer,newplanetype.Economy_Seat_Capacity,newplanetype.Business_Seat_Capacity,newplanetype.Platinum_Seat_Capacity,newplanetype.E_seats_per_row,newplanetype.B_seats_per_row,newplanetype.P_seats_per_row,newplanetype.max_load,newplanetype.fuel_capacity], function(err,res) {
        if (err) {
            console.log("error: ", err);
            return result(err, null);
        } else {
            console.log(res.rows)
            return result(null, res.rows);
        }
    });
};

Staff_work.updateflightstatus = function(flight,result){
    console.log("MODEL : ", flight)
    pool.query(" UPDATE flight_schedule SET flight_status = $1 WHERE flight_id = $2 ",[flight.flight[1],flight.flight[0]],function(err,res){
        if(err){
            console.log("error: ",err);
            return result(err,null);
        }else{
            console.log(res.rows);
            return result(null,res.rows);
        }
    });
}

Staff_work.addnewaircraftinstance = function(newaircraft,result){
    pool.query("INSERT INTO aircraft_instance VALUES ($1,$2,$3,$4,$5,$6)" ,[newaircraft.Aircraft_ID,newaircraft.Model_ID,newaircraft.Airline_Name,newaircraft.Aircraft_Status,newaircraft.Maintenance_Date,newaircraft.Purchase_Date],function(err,res){
        if (err) {
            console.log("error: ", err);
            return result(err, null);
          } else {
            console.log(res.rows)
            return result(null, res.rows);
          }
    });
};

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

module.exports = Staff_work;

