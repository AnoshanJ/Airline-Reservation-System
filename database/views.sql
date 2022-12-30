psql -U airline_res -h localhost : to connect to database
CREATE ROLE admin WITH LOGIN PASSWORD '1234';
GRANT ALL ON ALL TABLES IN SCHEMA public TO admin;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO admin;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO admin;

-- Amrithsagar Search View
CREATE OR REPLACE VIEW search_table AS 
SELECT flight_id, origin, departure_date, departure_time, destination, arrival_date, arrival_time 
FROM flight_schedule
JOIN route ON flight_schedule.route_id = route.route_id;
