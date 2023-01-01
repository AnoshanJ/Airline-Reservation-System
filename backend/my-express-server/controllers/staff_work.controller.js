'use strict';

const e = require('express');
const Staff_work = require('../models/Staff_work.model');

const responseValues = {
    arrivalflights : 0,
    planetype:0,
    aircraftinstance:0
}



exports.run = (req,res, cookies) => {
    try{
        responseValues.arrivalflights = [
            {
                flight_id       :null,
                aircraft_id     :null,
                departure_date  :null,
                departure_time  :null,
                arrival_date    :null,
                arrival_time    :null,
                Duration        :null,
                Origin          :null,
                Destination     :null
            }
        ];
        responseValues.planetype = null;
        console.log(responseValues.arrivalflights);
        res.render("staff_work",{ formData: req, message:null, docTitle: "STAFF_FLIGHT_WORK", data: responseValues, content:0, userRole: cookies});
    }catch(err){
        res.send("500");
    }
}

exports.getbystateFlights = (req,res, cookies) => {
    try{
        const state = req.state;
        Staff_work.getbystateFlights(state,(err,result)=>{
            if(err){
                console.log("Model Error"+err);
                res.send("500");
            }else{
                responseValues.arrivalflights = result;
                console.log(responseValues.arrivalflights[0]);
                res.render("staff_work", { formData: req, message:null,docTitle: "STAFF_FLIGHT_WORK", data: responseValues, content:1, userRole: cookies});
            }
        });
    }catch(err){
        console.log("Controller Error : "+err);
        res.send("500");
    }
}

exports.addnewplanetype = (req,res, cookies) => {
    try{

        const new_flight = new Staff_work(req.body);
        // handle null error
        if(new_flight.model_name === null || new_flight.variant===null || new_flight.manufacturer ===null || new_flight.economy_seat_capacity ===null || new_flight.business_seat_capacity ===null || new_flight.platinum_seat_capacity  ===null || new_flight.e_seats_per_row ===null || new_flight.b_seats_per_row ===null || new_flight.p_seats_per_row ===null || new_flight.max_load ===null || new_flight.fuel_capacity ===null ){
            res.status(400).send({ error:true, message: 'Please provide all required field'});
        }else{
            Staff_work.addnewplanetype(new_flight,function(err,flight){
                if(err){
                    res.send("<p>Error in Flight Added!</p>" +
                    "<script>setTimeout(function () { window.location.href = '/staff_work'; }, 2000);</script>");
                }
                else{
                    res.send("<p>Flight added successfully!</p>" +
                    "<script>setTimeout(function () { window.location.href = '/staff_work'; }, 2000);</script>");
                    // res.json({err:false,message:"Flight added successfully!",data:flight});
                    // responseValues.planetype = "Flight added successfully!";
                    // res.render("staff_work", { formData: req.body, message:"Flight added successfully!",docTitle: "STAFF_FLIGHT_WORK", data: responseValues, content:2 });
                }
            });
        }

    }catch(err){
        console.log("Controller Error : "+err);
        res.send("500"); 
    }
};

exports.addnewaircraftinstance = (req,res, cookies)=>{
    try{
        const new_aircraft = new Staff_work(req.body);
        //handlle null error
        if(new_aircraft.Aircraft_ID === null || new_aircraft.Model_ID === null || new_aircraft.Airline_Name === null || new_aircraft.Aircraft_Status ===null || new_aircraft.Maintenance_Date === null || new_aircraft.Purchase_Date === null){
            res.status(400).send({ error:true, message: 'Please provide all required field'});
        }else{
            Staff_work.addnewaircraftinstance(new_aircraft,function(err,aircraft){
                if(err){
                    res.send("<p>Error in Aircraft Instance Added!</p>" +
                    "<script>setTimeout(function () { window.location.href = '/staff_work'; }, 2000);</script>");
                }
                else{
                    res.send("<p>Aircraft Instance added successfully!</p>" +
                    "<script>setTimeout(function () { window.location.href = '/staff_work'; }, 2000);</script>");
                }
            });
        }
    }catch(err){
        console.log("Controller Error : "+err);
        res.send("500");
    }
};