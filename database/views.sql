psql -U airline_res -h localhost : to connect to database
CREATE ROLE admin WITH LOGIN PASSWORD '1234';


-- Amrithsagar Search View
CREATE OR REPLACE VIEW search_table AS 
SELECT flight_id, origin, departure_date, departure_time, destination, arrival_date, arrival_time 
FROM flight_schedule
JOIN route ON flight_schedule.route_id = route.route_id;

-- Anoshan Booking View
CREATE OR REPLACE VIEW booking_view AS  
SELECT booking.passport_no, booking.booking_date, registered_customer_account.user_type AS user_type 
FROM booking  
LEFT JOIN registered_customer_account ON booking.passport_no=registered_customer_account.passport_no 
LEFT JOIN guest_customer_account ON booking.passport_no=guest_customer_account.passport_no;

-- Anoshan Next Flight View
CREATE OR REPLACE VIEW next_flight_view AS   
SELECT booking.*, flight_schedule.departure_date, flight_schedule.flight_status, customer.customer_type,
       CASE customer.customer_type
           WHEN 'registered' THEN registered_customer_account.dob
           WHEN 'guest' THEN guest_customer_account.dob
       END AS date_of_birth,
       get_age(CASE customer.customer_type
                   WHEN 'registered' THEN registered_customer_account.dob
                   WHEN 'guest' THEN guest_customer_account.dob
               END) AS age
FROM flight_schedule
RIGHT JOIN booking ON flight_schedule.flight_id = booking.flight_id
LEFT JOIN customer ON booking.passport_no = customer.passport_no
LEFT JOIN registered_customer_account ON booking.passport_no = registered_customer_account.passport_no
LEFT JOIN guest_customer_account ON booking.passport_no = guest_customer_account.passport_no;


GRANT ALL ON ALL TABLES IN SCHEMA public TO admin;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO admin;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO admin;
