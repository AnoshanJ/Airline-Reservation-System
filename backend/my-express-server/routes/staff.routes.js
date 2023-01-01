
const express = require('express');
const router = express.Router()

const staffController = require('../controllers/staff.controller');

//Default Staff registration Page
router.get('/staff_register',function(req,res){
    try{
        const formData = req.body;
        console.log("staff register _____________",formData)
        staffController.run(formData,res);
    } catch(err){
        console.log(err);
        res.send("500");
    }
});

//Staff registration page
// router.post('/staff_register',function(req,res){
//     try{
//         const formData = req;
//         staffController.registerstaff(formData,res);
//     }catch(err){
//         console.log(err);
//         res.send("500");
//     }
// });

// ADD new Staff
router.post('/staff_register/registerstaff',function(req,res){
    try{
        const formData = req.body;
        console.log("formdata console ",formData)
        staffController.registerstaff(formData,res);
    }catch(err){
        console.log(err);
        res.send("500");
    }
});

module.exports = router;