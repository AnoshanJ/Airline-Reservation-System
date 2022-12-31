const express = require('express');
const router = express.Router()

const staff_workController = require('../controllers/staff_work.controller');

//Default Staff Work Page
router.get('/staff_work',function(req,res){
    try{
        const formData = req.body;
        staff_workController.run(formData,res);
    } catch(err){
        console.log(err);
        res.send("500");
    }
});

// Retreive All Arrived Flights
router.post('/staff_work/getbystateFlights',function(req,res){
    try{
        const formData = req.body;
        staff_workController.getbystateFlights(formData,res);
    }catch(err){
        console.log(err);
        res.send("500");        
    }
});

module.exports = router;