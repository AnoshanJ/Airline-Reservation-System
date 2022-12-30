/*AIRLINE TABLE*/

INSERT INTO Airline VALUES ('B Airways','+6223467897','contact@bairways.com','160/132 B Jl Rahmadsyah ,Sumatera Utara', 'Indonesia');

/* AIRPORT TABLE*/

INSERT INTO Airport (Code, Country, City, States) VALUES('HRI', 'Sri Lanka', 'Hambantota','Southern Province');
INSERT INTO Airport (Code, Country, City, States) VALUES('BIA', 'Sri Lanka', 'Katunayaka','Western Province');
INSERT INTO  Airport (Code, Country, City, States) VALUES ('CGK', 'Indonesia', 'Jakarta', 'northwest coast of Java');
INSERT INTO  Airport (Code, Country, City, States) VALUES ('DPS', 'Indonesia', 'Bali','Lesser Sunda Islands');
INSERT INTO  Airport (Code, Country, City, States) VALUES('DEL', 'India', 'Delhi','National Capital Territory of Delhi');
INSERT INTO Airport (Code, Country, City, States) VALUES('BOM', 'India', 'Mumbai', 'Maharashtra');
INSERT INTO Airport (Code, Country, City, States) VALUES('MAA', 'India', 'Chennai','Tamilnadu');
INSERT INTO Airport (Code, Country, City, States) VALUES('BKK', 'Thailand', 'Bangkok', 'Central Thailand');
INSERT INTO  Airport (Code, Country, City, States) VALUES('DMK', 'Thailand', 'Bangkok', 'Central Thailand');
INSERT INTO  Airport (Code, Country, City, States) VALUES('SIN', 'Singapore', 'Changi', 'East Region');

/*USER CATEGORY*/

INSERT INTO User_Category(User_Type,Minimum_Bookings,Discount) VALUES ('General',0,0);
INSERT INTO User_Category(User_Type,Minimum_Bookings,Discount)VALUES ('Frequent',5,5);
INSERT INTO User_Category(User_Type,Minimum_Bookings,Discount) VALUES ('Gold',10,8);

/*TRAVELLER CLASS*/

INSERT INTO Traveller_Class(class_name) VALUES ('Platinum');
INSERT INTO Traveller_Class(class_name) VALUES ('Business');
INSERT INTO Traveller_Class(class_name) VALUES ( 'Economy');

/*PLANE TYPE*/

INSERT INTO Plane_Type( Model_Name, variant, Manufacturer,Economy_Seat_Capacity, Business_Seat_Capacity,Platinum_Seat_Capacity,E_seats_per_row,B_seats_per_row, P_seats_per_row, max_load, fuel_capacity) VALUES ('Boeing 737','MAX 10','Boeing Commercial',150,24,12,6,4,4,88300,25941);
INSERT INTO Plane_Type( Model_Name, variant, Manufacturer,Economy_Seat_Capacity, Business_Seat_Capacity,Platinum_Seat_Capacity,E_seats_per_row,B_seats_per_row, P_seats_per_row, max_load, fuel_capacity) VALUES ('Boeing 757','300','Boeing Commercial',198,32,12,6,4,4,123830,43400);
INSERT INTO Plane_Type( Model_Name, variant, Manufacturer,Economy_Seat_Capacity, Business_Seat_Capacity,Platinum_Seat_Capacity,E_seats_per_row,B_seats_per_row, P_seats_per_row, max_load, fuel_capacity) VALUES ('Airbus A380','800','Airbus',500,48,20,10,6,4,575000,323546);

/*AIRCRAFT INSTANCE*/

INSERT INTO aircraft_instance  VALUES ('A001',1,'B Airways','On-Ground','2023-06-15','2022-06-15');
INSERT INTO aircraft_instance  VALUES ('A002',2,'B Airways','On-Ground','2023-03-10','2020-03-10');
INSERT INTO aircraft_instance  VALUES ('A003',3,'B Airways','On-Ground','2023-04-25','2021-04-25');

/* ROUTE */


INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B001','BIA', 'BKK', '03:20');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B002','BIA', 'CGK', '04:45');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B003','BIA', 'DPS', '07:15');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B004','BIA', 'DEL', '03:05');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B005','BIA', 'BOM', '02:25');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B006','BIA', 'MAA', '01:15');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B007','BIA', 'DMK', '03:50');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B008','BIA', 'SIN', '03:50');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B009','HRI', 'SIN', '03:40');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B010','SIN', 'BIA', '03:40');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B011','SIN', 'HRI', '03:30');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B012','SIN', 'CGK', '01:40');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B013','SIN', 'DPS', '02:20');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B014','SIN', 'DEL', '05:40');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B015','SIN', 'BOM', '05:05');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B016','SIN', 'MAA', '03:55');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B017','SIN', 'BKK', '02:15');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B018','SIN', 'DMK', '02:20');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B019','CGK', 'BIA', '04:35');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B020','CGK', 'DEL', '08:50');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B021','CGK', 'BOM', '08:10');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B022','CGK', 'MAA', '07:05');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B023','CGK', 'BKK', '03:15');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B024','CGK', 'DMK', '03:40');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B025','CGK', 'SIN', '01:40');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B026','DPS', 'BIA', '07:50');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B027','DPS', 'DEL', '09:55');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B028','DPS', 'BOM', '09:00');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B029','DPS', 'MAA', '08:40');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B030','DPS', 'BKK', '04:10');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B031','DPS', 'DMK', '04:15');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B032','DPS', 'SIN', '02:25');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B033','DEL', 'CGK', '08:20');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B034','DEL', 'DPS', '08:20');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B035','DEL', 'BIA', '03:25');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B036','DEL', 'BKK', '03:45');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B037','DEL', 'DMK', '03:45');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B038','DEL', 'SIN', '05:30');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B039','BOM', 'CGK', '06:15');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B040','BOM', 'DPS', '09:00');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B041','BOM', 'BIA', '02:25');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B042','BOM', 'BKK', '04:05');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B043','BOM', 'DMK', '04:00');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B044','BOM', 'SIN', '05:14');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B045','MAA', 'CGK', '05:00');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B046','MAA', 'DPS', '06:30');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B047','MAA', 'BIA', '01:15');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B048','MAA', 'BKK', '03:20');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B049','MAA', 'DMK', '03:30');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B050','MAA', 'SIN', '04:10');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B051','BKK', 'CGK', '03:20');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B052','BKK', 'DPS', '04:10');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B053','BKK', 'BIA', '03:25');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B054','BKK', 'DEL', '04:10');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B055','BKK', 'BOM', '04:50');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B056','BKK', 'MAA', '03:20');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B057','BKK', 'SIN', '02:15');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B058','DMK', 'CGK', '03:20');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B059','DMK', 'DPS', '04:10');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B060','DMK', 'BIA', '03:20');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B061','DMK', 'DEL', '04:00');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B062','DMK', 'BOM', '04:00');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B063','DMK', 'MAA', '03:25');
INSERT INTO Route(route_id,origin, destination, duration) VALUES ('B064','DMK', 'SIN', '02:20');