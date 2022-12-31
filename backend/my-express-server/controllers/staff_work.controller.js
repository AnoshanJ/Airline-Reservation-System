'use strict';

const Staff_work = require('../models/staff_work.model');

const responseValues = {
    arrivalflights : 0
}

exports.run = (req,res) => {
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
        console.log(responseValues.arrivalflights);
        res.render("staff_work",{ formData: req, docTitle: "STAFF_WORK", data: responseValues, content:0 });
    }catch(err){
        res.send("500");
    }
}

exports.getbystateFlights = (req,res) => {
    try{
        const state = req.state;
        Staff_work.getbystateFlights(state,(err,result)=>{
            if(err){
                console.log("Model Error"+err);
                res.send("500");
            }else{
                responseValues.arrivalflights = result;
                console.log(responseValues.arrivalflights[0]);
                res.render("staff_work", { formData: req, docTitle: "STAFF_WORK", data: responseValues, content:1 });
            }
        });
    }catch(err){
        console.log("Controller Error"+err);
        res.send("500");
    }
}
