/*
  ___  _  _  ___  ___  ___  _____   ___  _____  _  _____  ___  __  __  ___  _  _  _____  ___ 
 |_ _|| \| |/ __|| __|| _ \|_   _| / __||_   _|/_\|_   _|| __||  \/  || __|| \| ||_   _|/ __|
  | | | .` |\__ \| _| |   /  | |   \__ \  | | / _ \ | |  | _| | |\/| || _| | .` |  | |  \__ \
 |___||_|\_||___/|___||_|_\  |_|   |___/  |_|/_/ \_\|_|  |___||_|  |_||___||_|\_|  |_|  |___/
                                                                                                                                                                                     
*/



-----------------------AIRLINE TABLE-----------------------


INSERT INTO Airline VALUES ('B Airways','+6223467897','contact@bairways.com','160/132 B Jl Rahmadsyah ,Sumatera Utara', 'Indonesia');


-----------------------AIRPORT TABLE-----------------------


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


-----------------------USER CATEGORY-----------------------


INSERT INTO User_Category(User_Type,Minimum_Bookings,Discount) VALUES ('General',0,0);
INSERT INTO User_Category(User_Type,Minimum_Bookings,Discount)VALUES ('Frequent',5,5);
INSERT INTO User_Category(User_Type,Minimum_Bookings,Discount) VALUES ('Gold',10,9);


-----------------------TRAVELLER CLASS-----------------------


INSERT INTO Traveller_Class(class_name) VALUES ('Platinum');
INSERT INTO Traveller_Class(class_name) VALUES ('Business');
INSERT INTO Traveller_Class(class_name) VALUES ( 'Economy');


-----------------------PLANE TYPE-----------------------


INSERT INTO Plane_Type( Model_Name, variant, Manufacturer,Economy_Seat_Capacity, Business_Seat_Capacity,Platinum_Seat_Capacity,E_seats_per_row,B_seats_per_row, P_seats_per_row, max_load, fuel_capacity) VALUES ('Boeing 737','MAX 10','Boeing Commercial',150,24,12,6,4,4,88300,25941);
INSERT INTO Plane_Type( Model_Name, variant, Manufacturer,Economy_Seat_Capacity, Business_Seat_Capacity,Platinum_Seat_Capacity,E_seats_per_row,B_seats_per_row, P_seats_per_row, max_load, fuel_capacity) VALUES ('Boeing 757','300','Boeing Commercial',198,32,12,6,4,4,123830,43400);
INSERT INTO Plane_Type( Model_Name, variant, Manufacturer,Economy_Seat_Capacity, Business_Seat_Capacity,Platinum_Seat_Capacity,E_seats_per_row,B_seats_per_row, P_seats_per_row, max_load, fuel_capacity) VALUES ('Airbus A380','800','Airbus',500,48,20,10,6,4,575000,323546);


-----------------------AIRCRAFT INSTANCE-----------------------


INSERT INTO aircraft_instance  VALUES ('A001',1,'B Airways','On-Ground','2023-06-15','2022-06-15');
INSERT INTO aircraft_instance  VALUES ('A002',2,'B Airways','On-Ground','2023-03-10','2020-03-10');
INSERT INTO aircraft_instance  VALUES ('A003',3,'B Airways','On-Ground','2023-04-25','2021-04-25');
INSERT INTO aircraft_instance  VALUES ('A004',1,'B Airways','On-Ground','2023-02-24','2020-05-16');
INSERT INTO aircraft_instance  VALUES ('A005',1,'B Airways','On-Ground','2023-08-21','2021-07-22');
INSERT INTO aircraft_instance  VALUES ('A006',2,'B Airways','On-Ground','2023-05-02','2021-01-02');
INSERT INTO aircraft_instance  VALUES ('A007',3,'B Airways','On-Ground','2023-02-12','2020-04-09');
INSERT INTO aircraft_instance  VALUES ('A008',1,'B Airways','On-Ground','2023-12-23','2021-12-31');


----------------------- ROUTE-----------------------


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


------------------------CUSTOMER TABLE------------------------


INSERT INTO Customer(Passport_no, Customer_Type) VALUES('C00002345', 'registered') ;
INSERT INTO Customer(Passport_no, Customer_Type) VALUES('U0048902', 'registered') ;
INSERT INTO Customer(Passport_no, Customer_Type) VALUES('E00016545', 'registered') ;
INSERT INTO Customer(Passport_no, Customer_Type) VALUES('J90005678', 'registered') ;
INSERT INTO Customer(Passport_no, Customer_Type) VALUES('G56789088', 'guest') ;
INSERT INTO Customer(Passport_no, Customer_Type) VALUES('B00987897', 'guest') ;
INSERT INTO Customer(Passport_no, Customer_Type) VALUES('E50045673', 'registered') ;
INSERT INTO Customer(Passport_no, Customer_Type) VALUES('R10003456', 'registered') ;
INSERT INTO Customer(Passport_no, Customer_Type) VALUES('D00004536', 'registered') ;
INSERT INTO Customer(Passport_no, Customer_Type) VALUES('A09345262', 'guest') ;
INSERT INTO Customer(Passport_no, Customer_Type) VALUES('C00986543', 'guest') ;
INSERT INTO Customer(Passport_no, Customer_Type) VALUES('D34509850', 'guest') ;


------------------------REGISTERED CUSTOMER ACCOUNT------------------------


INSERT INTO Registered_Customer_Account( Password, First_Name, Last_Name, Gender, DOB, Email, Mobile, User_Type, Address, Country, Passport_no, No_of_Bookings, Joined) VALUES ('jzO77wvelMYbRx', 'Emily','Tina' ,'Female', '1989-12-12', 'emily123@gmail.com', '(555) 555-1234', 'General', '148, Hilltop Ave.Far Rockaway, New York' , 'USA' , 'C00002345' , 2 ,'2022-12-24 10:10:53');
INSERT INTO Registered_Customer_Account( Password, First_Name, Last_Name, Gender, DOB, Email, Mobile, User_Type, Address, Country, Passport_no, No_of_Bookings, Joined) VALUES ( 'iBX3A8p59DBRB', 'Adam','Peter' ,'Male', '1976-02-18', 'adammnb@yahoo.com', '(78) 555-1234', 'Frequent', '56B, Victoria Street, Melbourne' , 'Australia' , 'U0048902' , 6 ,'2022-12-24 11:12:34');
INSERT INTO Registered_Customer_Account( Password, First_Name, Last_Name, Gender, DOB, Email, Mobile, User_Type, Address, Country, Passport_no, No_of_Bookings, Joined) VALUES ( 'TkVB6JAM684S', 'Chris','Evans', 'Male', '1999-02-22', 'chrisnew@gmail.com', '(202) 588-6500', 'Gold', '148, 45A, Cobblestone Ave.Deland, FL' , 'USA' , 'E00016545' , 12 ,'2022-12-25 08:40:43');
INSERT INTO Registered_Customer_Account( Password, First_Name, Last_Name, Gender, DOB, Email, Mobile, User_Type, Address, Country, Passport_no, No_of_Bookings, Joined) VALUES ( 'Yhgrt56l@der', 'David', 'Warner', 'Male',  '1976-11-08', 'warn30@gmail.com', '(345) 789-6788', 'General', '234, Victoria Street, Sydney' , 'Australia' , 'J90005678' , 3 ,'2022-12-25 09:12:21');
INSERT INTO Registered_Customer_Account( Password, First_Name, Last_Name, Gender, DOB, Email, Mobile, User_Type, Address, Country, Passport_no, No_of_Bookings, Joined) VALUES ( '2jHO4KTQQfTnVQt', 'Emma', 'Watson', 'Female',  '2005-12-03', 'emma@yahoo.com', '(234) 234-4532', 'General', '342, Cherry Court, SOUTHAMPTON' , 'UK' , 'E50045673' , 1 ,'2023-01-01 03:15:09');
INSERT INTO Registered_Customer_Account( Password, First_Name, Last_Name, Gender, DOB, Email, Mobile, User_Type, Address, Country, Passport_no, No_of_Bookings, Joined) VALUES ( 'adFTG54@3JH', 'Albert', 'Einstein', 'Male',  '2006-10-12', 'albeins@gmail.com', '(345) 986-4567', 'General', '813, Howard Street , Chicago' , 'USA' , 'R10003456' , 2 ,'2023-01-02 15:43:11');
INSERT INTO Registered_Customer_Account( Password, First_Name, Last_Name, Gender, DOB, Email, Mobile, User_Type, Address, Country, Passport_no, No_of_Bookings, Joined) VALUES ( '9GHJ*HJSBad', 'Sheldon', 'George', 'Male',  '2006-02-18', 'sheldon18@gmail.com', '(234) 134-8964', 'General', '45, Shirley Street , Canberra' , 'Australia' , 'D00004536' , 1 ,'2023-01-03 02:34:51');


------------------------GUEST CUSTOMER ACCOUNT------------------------


INSERT INTO Guest_Customer_Account( First_Name, Last_Name, Gender, DOB, Passport_no, Email, Mobile) VALUES ('Ram', 'Kumar', 'Male', '1978-05-09', 'G56789088', 'ram_new@gmail.com', '(555) 555-1234');
INSERT INTO Guest_Customer_Account( First_Name, Last_Name, Gender, DOB, Passport_no, Email, Mobile) VALUES ('Millie', 'Brown', 'Female', '2000-09-05','B00987897', 'mill@yahoo.com', '(456) 675-7854');
INSERT INTO Guest_Customer_Account( First_Name, Last_Name, Gender, DOB, Passport_no, Email, Mobile) VALUES ('Olivia', 'Rodrigo', 'Female', '2006-02-12','A09345262', 'olive12@yahoo.com', '(324) 234-7778');
INSERT INTO Guest_Customer_Account( First_Name, Last_Name, Gender, DOB, Passport_no, Email, Mobile) VALUES ('Jenna', 'Ortega', 'Female', '2005-12-31','C00986543', 'jennort@yahoo.com', '(432) 675-5412');
INSERT INTO Guest_Customer_Account( First_Name, Last_Name, Gender, DOB, Passport_no, Email, Mobile) VALUES ('Shawn', 'Mendes', 'Male', '1998-11-05','D34509850', 'shawn_men@gmail.com', '(543) 342-1235');





------------------------STAFF------------------------


INSERT INTO Staff(Category,Password,First_Name,Last_Name,Contact,Email,DOB,Gender,Assigned_Airport,Country) values ('Admin','$2b$10$wmlK/FgCEsoX8m3cf.z/ruRIVXFZh8wo6TjqRvlaV9RJkUJ0lkgYG','Joseph','Andrew','(456) 675-7854','andrew@bairways.com','1968-6-17','Male','CGK','USA');
INSERT INTO Staff(Category,Password,First_Name,Last_Name,Contact,Email,DOB,Gender,Assigned_Airport,Country) values ('Manager','OxtfsvI1TCSOtc1','Kumar','Swami','(852) 675-7854','swami@bairways.com','1972-1-27','Male','CGK','India');
INSERT INTO Staff(Category,Password,First_Name,Last_Name,Contact,Email,DOB,Gender,Assigned_Airport,Country) values ('General','J42YgQyfMmlgQlH','Gavin','Anotio','(123) 675-7854','antonio@bairways.com','1980-7-29','Male','DMK','Thailand');
INSERT INTO Staff(Category,Password,First_Name,Last_Name,Contact,Email,DOB,Gender,Assigned_Airport,Country) values ('Pilot','kWyofTsJpWmkFHx','Thomas','Seamus','(65) 675-7854','seamus@bairways.com','1959-8-3','Male','SIN','Singapore');


------------------------FLIGHT SCHEDULE------------------------

 
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time,Flight_Status) VALUES ('F001','B021','A001','2022-11-15','00:00:00','Landed');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time,Flight_Status) VALUES ('F002','B004','A002','2022-11-27','01:30:00','Landed');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time,Flight_Status) VALUES ('F003','B009','A003','2022-12-20','02:20:00','Landed');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time,Flight_Status) VALUES ('F004','B014','A006','2022-12-25','02:15:00','Landed');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time,Flight_Status) VALUES ('F005','B021','A005','2022-12-27','01:00:00','Cancelled');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time,Flight_Status) VALUES ('F006','B004','A004','2022-12-30','01:45:00','Landed');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time,Flight_Status) VALUES ('F007','B009','A007','2022-01-06','20:20:00','Cancelled');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time,Flight_Status) VALUES ('F008','B014','A008','2022-01-07','03:15:00','Landed');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F009','B035','A002','2023-01-11','19:00:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F010','B039','A001','2023-01-11','21:10:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F011','B014','A003','2023-01-12','15:30:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F012','B034','A004','2023-01-12','16:15:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F013','B038','A006','2023-01-12','18:50:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F014','B039','A005','2023-01-13','10:55:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F015','B011','A007','2023-01-13','12:10:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F016','B034','A008','2023-01-13','13:05:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F017','B033','A003','2023-01-13','15:20:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F018','B004','A002','2023-01-14','17:25:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F019','B021','A001','2023-01-14','18:30:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F020','B039','A005','2023-01-15','19:45:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F021','B014','A006','2023-01-15','23:00:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F022','B009','A007','2023-01-15','23:10:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F023','B027','A004','2023-01-15','23:15:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F024','B043','A001','2023-01-16','07:20:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F025','B021','A005','2023-01-16','08:35:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F026','B019','A003','2023-01-20','15:50:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F027','B011','A007','2023-01-21','11:10:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F028','B027','A008','2023-01-22','02:15:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F029','B038','A002','2023-02-23','03:00:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F030','B038','A006','2023-01-25','19:40:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F031','B034','A008','2023-01-25','21:45:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F032','B009','A007','2023-01-25','22:00:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F033','B021','A005','2023-01-26','04:05:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F034','B034','A004','2023-01-31','17:40:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F035','B001','A003','2023-02-02','00:15:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F036','B011','A002','2023-02-03','01:10:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F037','B062','A001','2023-02-03','11:05:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F038','B009','A002','2023-02-10','17:30:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F039','B039','A005','2023-02-11','05:00:00');
INSERT into flight_schedule(Flight_ID,Route_ID,Aircraft_ID,Departure_Date,Departure_Time) VALUES ('F040','B014','A006','2023-02-13','06:10:00');


---------------------BOOKING------------------------


INSERT into booking (Passport_no,Flight_ID ,Seat_IDs,Model_ID,Seat_Price,Discount ,Final_Price,Booking_Status,Booking_Date) values ('C00002345','F002','{"1A"}',2,600.00,0.00,600.00,'Paid','2022-10-27');
INSERT into booking (Passport_no,Flight_ID ,Seat_IDs,Model_ID,Seat_Price,Discount ,Final_Price,Booking_Status,Booking_Date) values ('U0048902','F002','{"4A"}',2,500.00,5.00,475.00,'Paid','2022-11-05');
INSERT into booking (Passport_no,Flight_ID ,Seat_IDs,Model_ID,Seat_Price,Discount ,Final_Price,Booking_Status,Booking_Date) values ('G56789088','F003','{"12A","13A"}',3,900.00,0.00,900.00,'Paid','2022-11-12');
INSERT into booking (Passport_no,Flight_ID ,Seat_IDs,Model_ID,Seat_Price,Discount ,Final_Price,Booking_Status,Booking_Date) values ('B00987897','F002','{"1B"}',2,600.00,0.00,600.00,'Paid','2022-11-02');
INSERT into booking (Passport_no,Flight_ID ,Seat_IDs,Model_ID,Seat_Price,Discount ,Final_Price,Booking_Status,Booking_Date) values ('D00004536','F001','{"1A"}',1,600.00,0.00,600.00,'Paid','2022-11-04');
INSERT into booking (Passport_no,Flight_ID ,Seat_IDs,Model_ID,Seat_Price,Discount ,Final_Price,Booking_Status,Booking_Date) values ('R10003456','F002','{"2A"}',2,600.00,0.00,600.00,'Paid','2022-11-05');
INSERT into booking (Passport_no,Flight_ID ,Seat_IDs,Model_ID,Seat_Price,Discount ,Final_Price,Booking_Status,Booking_Date) values ('A09345262','F032','{"3A"}',2,600.00,0.00,600.00,'Paid','2023-01-25');
INSERT into booking (Passport_no,Flight_ID ,Seat_IDs,Model_ID,Seat_Price,Discount ,Final_Price,Booking_Status,Booking_Date) values ('C00986543','F035','{"11A"}',2,600.00,0.00,600.00,'Paid','2023-02-02');
INSERT into booking (Passport_no,Flight_ID ,Seat_IDs,Model_ID,Seat_Price,Discount ,Final_Price,Booking_Status,Booking_Date) values ('D34509850','F037','{"10B"}',2,600.00,0.00,600.00,'Paid','2023-02-03');


---------------------PASSENGER SEAT------------------------


INSERT INTO Passenger_Seat VALUES(1, 2, '1A', 600.00, 'Emily Tina','C00002345','1989-12-12');
INSERT INTO Passenger_Seat VALUES (2, 2, '4A', 475.00, 'Adam Peter','U0048902','1976-02-18');
INSERT INTO Passenger_Seat VALUES (3, 3, '12A', 450.00, 'Ram Kumar','G56789088','1978-05-09');
INSERT INTO Passenger_Seat VALUES (4, 2, '1B', 600.00, 'Millie Brown','B00987897','2000-09-05');
INSERT INTO Passenger_Seat VALUES (4, 3, '13A', 450.00, 'Ram Kumar', 'G56789088','1978-05-09');
INSERT INTO Passenger_Seat VALUES (5, 1, '1A', 600.00, 'Sheldon George', 'D00004536','2006-02-18');
INSERT INTO Passenger_Seat VALUES (6, 2, '2A', 600.00, 'Albert Einstein', 'R10003456','2006-10-12');
INSERT INTO Passenger_Seat VALUES (7, 2, '2A', 600.00, 'Olivia Rodrigo', 'A09345262','2006-02-12');
INSERT INTO Passenger_Seat VALUES (8, 2, '2A', 600.00, 'Jenna Ortega', 'C00986543','2005-12-31');
INSERT INTO Passenger_Seat VALUES (9, 2, '2A', 600.00, 'Shawn Mendes', 'D34509850','1998-11-05');


/*

  ___  ___   ___    ___  ___  ___   _   _  ___  ___    ___    _    _     _     ___ 
 | _ \| _ \ / _ \  / __|| __||   \ | | | || _ \| __|  / __|  /_\  | |   | |   / __|
 |  _/|   /| (_) || (__ | _| | |) || |_| ||   /| _|  | (__  / _ \ | |__ | |__ \__ \
 |_|  |_|_\ \___/  \___||___||___/  \___/ |_|_\|___|  \___|/_/ \_\|____||____||___/
                                                                                   

*/


---------------------INSERTING ROUTES-----------------------------


CALL insert_route_price('B001',800,500,145);
CALL insert_route_price('B002',700,600,161);
CALL insert_route_price('B003',750,670,166);
CALL insert_route_price('B004',610,510,147);
CALL insert_route_price('B005',500,430,135);
CALL insert_route_price('B006',680,590,192);
CALL insert_route_price('B007',610,510,144);
CALL insert_route_price('B008',548,400,116);
CALL insert_route_price('B009',500,350,105);
CALL insert_route_price('B010',450,330,97);
CALL insert_route_price('B011',400,300,90);
CALL insert_route_price('B012',350,245,63);
CALL insert_route_price('B013',330,220,57);
CALL insert_route_price('B014',840,670,203);
CALL insert_route_price('B015',780,625,195);
CALL insert_route_price('B016',680,500,165);
CALL insert_route_price('B017',310,200,49);
CALL insert_route_price('B018',500,350,92);
CALL insert_route_price('B019',580,450,153);
CALL insert_route_price('B020',980,720,297);
CALL insert_route_price('B021',1100,800,330);
CALL insert_route_price('B022',600,430,134);
CALL insert_route_price('B023',510,310,103);
CALL insert_route_price('B024',520,315,106);
CALL insert_route_price('B025',280,170,30);
CALL insert_route_price('B026',580,360,166);
CALL insert_route_price('B027',820,580,236);
CALL insert_route_price('B028',1100,810,330);
CALL insert_route_price('B029',1050,790,320);
CALL insert_route_price('B030',650,480,149);
CALL insert_route_price('B031',650,480,149);
CALL insert_route_price('B032',410,230,59);
CALL insert_route_price('B033',1050,820,318);
CALL insert_route_price('B034',780,520,210);
CALL insert_route_price('B035',620,410,180);
CALL insert_route_price('B036',420,280,87);
CALL insert_route_price('B037',430,290,90);
CALL insert_route_price('B038',512,370,128);
CALL insert_route_price('B039',730,520,200);
CALL insert_route_price('B040',880,620,300);
CALL insert_route_price('B041',730,520,200);
CALL insert_route_price('B042',480,300,85);
CALL insert_route_price('B043',500,310,90);
CALL insert_route_price('B044',680,420,150);
CALL insert_route_price('B045',580,320,121);
CALL insert_route_price('B046',590,350,140);
CALL insert_route_price('B047',480,280,110);
CALL insert_route_price('B048',480,320,80);
CALL insert_route_price('B049',470,310,130);
CALL insert_route_price('B050',480,320,80);
CALL insert_route_price('B051',580,300,116);
CALL insert_route_price('B052',520,340,148);
CALL insert_route_price('B053',510,320,144);
CALL insert_route_price('B054',650,420,238);
CALL insert_route_price('B055',420,290,105);
CALL insert_route_price('B056',610,310,86);
CALL insert_route_price('B057',380,200,46);
CALL insert_route_price('B058',430,280,100);
CALL insert_route_price('B059',620,470,226);
CALL insert_route_price('B060',530,340,144);
CALL insert_route_price('B061',640,470,180);
CALL insert_route_price('B062',660,490,200);
CALL insert_route_price('B063',560,430,170);
CALL insert_route_price('B064',390,220,83);




