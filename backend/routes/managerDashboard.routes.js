const express = require("express");
const router = express.Router();
const checkRole = require('../middleware/auth');
const managerDashboardController = require('../controllers/managerDashboard.controller.js');


// router.get('/userDashboard', checkRole('user'), (req, res) => {
//     // The user is a user, so allow them to access the route
//     try {
//             //res.redirect('/userDashboard');
//             const formData = req.body;
//             registrationController.getUserDetails(formData, res);
        
//           } catch (err) {
//               console.log(err);
//               res.send("1500");
//           }
//   });



router.get('/managerDashboard', checkRole('Manager'), (req, res) => {
    // The user is a manager, so allow them to access the route
        try{
        const formData = req.body;
        res.render("managerdashboard", { formData: req, docTitle: "",title:"Manager Dashboard", sampleData: req.cookies.user, action:'list', userRole: req.cookies.userRole});
        console.log("Manager controller")
        }catch(err){
            console.log(err);
            res.send("1500");
        }
  });

router.post('/managerdashboard/getdetail', checkRole('Manager'), (req, res) => {
    // The user is a Manager, so allow them to access the route
    try{
        const formData = req;
        managerDashboardController.getmanagerdetails(formData,res);
    } catch(err){
        console.log(err);
        res.send("1500");
    }
});

router.post('/managerdashboard/firestaff',checkRole('Manager'),(req,res)=>{
    try{
        const formData = req;
        managerDashboardController.firestaff(formData,res);
        
    }catch(err){
        console.log(err);
        res.send("500");
    }
})

router.post('/managerdashboard/addstaff',checkRole('Manager'),(req,res)=>{
    try{
        const formData = req;
        managerDashboardController.addstaff(formData,res);
    }catch(err){
        console.log(err);
        res.send("500");
    }
})






module.exports = router;