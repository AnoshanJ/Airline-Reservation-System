
'use strict';

const e = require('express');
const Staff = require('../models/staff.model');

const responseValues = {
    staffdetail : 0,
    
}

exports.run = (req,res) => {
    try{
        responseValues.staffdetail=[
            {
                Staff_ID : null,
                Category : null,
                Password : null,
                First_Name : null,
                Last_Name : null,
                Contact : null,
                Email : null,
                DOB : null,
                Gender : null,
                Assigned_Airport : null,
                Country : null
            }
        ];
        console.log("print +++++++++++ ",req.body);
        res.render('staff_register',{ formData: req.body, message:null, docTitle: "STAFF_SIGNUP", data: responseValues,content:0});
    }catch(err){
        res.send("500");
    }
};

// exports.registerstaff = (req,res) => {
//     try{
//         const new_staff = new Staff(req);
//         // handle null error
//         if(new_staff.Category === null || new_staff.Password === null || new_staff.First_Name === null || new_staff.Last_Name === null || new_staff.Contact === null || new_staff.Email === null || new_staff.DOB === null || new_staff.Gender === null || new_staff.Assigned_Airport === null || new_staff.Country === null){
//             res.status(400).send({ error:true, message: 'Please provide all required field'});
//         }else{
//             Staff.registerstaff(new_staff,function(err,staff){
//                 if(err){
//                     render.send(err);
//                 }
//                 else{
//                     res.send("<p>User created successfully! Redirecting to login page in 3 seconds...</p>" +
//                     "<script>setTimeout(function () { window.location.href = '/staff_login'; }, 3000);</script>");
//                 }
//             })
//         }
//     }catch(err){
//         console.log("Controller Error : "+err);
//         res.send("500"); 
//     }
// };


// exports.getbystateFlights = (req,res, cookies) => {
//     try{
//         const state = req.state;
//         Staff_work.getbystateFlights(state,(err,result)=>{
//             if(err){
//                 console.log("Model Error"+err);
//                 res.send("500");
//             }else{
//                 responseValues.arrivalflights = result;
//                 console.log(responseValues.arrivalflights[0]);
//                 res.render("staff_work", { formData: req, message:null,docTitle: "STAFF_FLIGHT_WORK", data: responseValues, content:1, userRole: cookies});
//             }
//         });
//     }catch(err){
//         console.log("Controller Error : "+err);
//         res.send("500");
//     }
// }

// exports.getstaffbyemail = (req,res,cookies) =>{
//     try{
//         const email = req.email;
//         const password = req.password;
//         Staff.getstaffbyemail(email,password,(err,result)=>{
//             if(err){
//                 console.log("Model Error"+err);
//                 res.send("500");
//             }else{
//                 responseValues.staffdetail = result;
//                 console.log(responseValues.staffdetail[0]);
//                 res.render("staff_login",{formData:req,message:null,docTitle:"STAFF_LOGIN",data:responseValues,content:1,userRole:cookies});
//             }
//         });
//     }catch(err){
//         console.log("Controller Error : "+err);
//         res.send("500");
//     }
// }