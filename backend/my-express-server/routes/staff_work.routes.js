const express = require('express');
const router = express.Router()

const staff_workController = require('../controllers/staff_work.controller');

//Default Staff Work Page
router.get('/staff_work',function(req,res){
    try{
        const formData = req.body;
        staff_workController.run(formData,res, req.cookies.userRole);
    } catch(err){
        console.log(err);
        res.send("500");
    }
});

// Retreive All Arrived Flights
router.post('/staff_work/getbystateFlights',function(req,res){
    try{
        const formData = req.body;
        staff_workController.getbystateFlights(formData,res,req.cookies.userRole);
    }catch(err){
        console.log(err);
        res.send("500");        
    }
});

// ADD new Plane
router.post('/staff_work/addnewplanetype',function(req,res){
    try{
        const formData = req;
        staff_workController.addnewplanetype(formData,res,req.cookies.userRole);
    }catch(err){
        console.log(err);
        res.send("500");
    }
});

// ADD new Aircraft Instance
router.post('/staff_work/addnewaircraftinstance',function(req,res){
    try{
        const formData = req;
        staff_workController.addnewaircraftinstance(formData,res,req.cookies.userRole);
    }catch(err){
        console.log(err);
        res.send("500");
    }
})


module.exports = router;