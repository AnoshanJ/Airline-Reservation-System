const express = require("express");
const router = express.Router();

const searchController = require('../controllers/search.controller.js');

router.get('/search', function(req, res) {
    try {
        const formData = req.body;
        searchController.getFlightSchedule(formData, res, req.cookies.userRole);
  
    } catch (err) {
        console.log(err);
        res.send("500");
    }
});

module.exports = router;