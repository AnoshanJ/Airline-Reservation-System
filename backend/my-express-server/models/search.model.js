const pool = require("./db.js");

const Search = function(search){
    this.flight_id = search.flight_id;
    this.origin = search.origin;
    this.arrival_date = search.arrival_date;
    this.arrival_time = search.arrival_time;
    this.destination = search.destination;
    this.departure_date = search.departure_date;
    this.departure_time = search.departure_time;
}
Search.getFlightSchedule= function(result){
    sql = "SELECT * FROM search_table ";
    pool.query(sql, function(err,res){
    if(err){
            console.log("error: ",err);
            return result(err,null);
        }
        else{
            console.log("Flight Schedule Details: ",res.rows);
            return result(null,res.rows);
        }
    });
}

 module.exports = Search;