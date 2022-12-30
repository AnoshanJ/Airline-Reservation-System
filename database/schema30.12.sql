DROP DATABASE IF EXISTS airline_res;
CREATE DATABASE airline_res;
\c airline_res

DROP TRIGGER IF EXISTS insert_seats_for_new_model ON Plane_Type;

DROP PROCEDURE IF EXISTS insert_seats;

DROP TABLE IF EXISTS Airline CASCADE;
DROP TABLE IF EXISTS User_Category CASCADE;
DROP TABLE IF EXISTS Customer CASCADE;
DROP TABLE IF EXISTS Registered_Customer_Account CASCADE;
DROP TABLE IF EXISTS Traveller_Class CASCADE;
DROP TABLE IF EXISTS Airport CASCADE;
DROP TABLE IF EXISTS Plane_Type CASCADE;
DROP TABLE IF EXISTS Aircraft_Seat CASCADE;
DROP TABLE IF EXISTS Aircraft_Instance CASCADE;
DROP TABLE IF EXISTS Route CASCADE;
DROP TABLE IF EXISTS Flight_Schedule CASCADE;
DROP TABLE IF EXISTS Seat_Price CASCADE;
DROP TABLE IF EXISTS Booking CASCADE;
DROP TABLE IF EXISTS Staff CASCADE;
DROP TABLE IF EXISTS Account CASCADE;
DROP TABLE IF EXISTS session CASCADE;
DROP TABLE IF EXISTS Guest_Customer CASCADE;

DROP TYPE IF EXISTS  Booking_Status_Enum;
DROP TYPE IF EXISTS  Flight_Status_Enum;
DROP TYPE IF EXISTS  aircraft_status_Enum;
DROP TYPE IF EXISTS  gender_type_Enum;
DROP TYPE IF EXISTS  customer_category_Enum;
DROP TYPE IF EXISTS  registered_customer_category;
DROP TYPE IF EXISTS class_type_Enum;
DROP TYPE IF EXISTS Staff_Category;
DROP TYPE IF EXISTS Account_Type;

/*
---------------------------------------------------------------
*/
CREATE TYPE Flight_Status_Enum AS ENUM(
'Scheduled',
'Departed-On-Time',
'Delayed-Departure',
'Landed',
'Cancelled'
);

 CREATE TYPE aircraft_status_Enum AS ENUM( 
 'On-Ground',
 'In-Air');  

CREATE TYPE Booking_Status_Enum AS ENUM(
'Not paid',
'Paid'); 

CREATE TYPE gender_type_Enum AS ENUM(
'Male',
'Female',
'Other'); 

CREATE TYPE customer_category_Enum AS ENUM(
'guest',
'registered'
);

CREATE TYPE registered_customer_category AS ENUM(
'General',
'Frequent',
'Gold'
);

CREATE TYPE class_type_Enum AS ENUM(
'Economy',
'Business',
'Platinum'); 

CREATE TYPE staff_category AS ENUM(
'Admin',
'Manager',
'General',
'Pilot'
);

CREATE TYPE Account_Type AS ENUM(
	'Staff',
	'Customer'
);



/* DOMAINS */

CREATE DOMAIN UUID4 AS char(36)
CHECK (VALUE ~ '[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}');


/* FUNCTIONS */

--https://stackoverflow.com/questions/12505158/generating-a-uuid-in-postgres-for-insert-statement
CREATE OR REPLACE FUNCTION generate_uuid4 ()
    RETURNS char( 36
)
AS $$
DECLARE
    var_uuid char(36);
BEGIN
    SELECT
        uuid_in(overlay(overlay(md5(random()::text || ':' || clock_timestamp()::text)
            PLACING '4' FROM 13)
        PLACING to_hex(floor(random() * (11 - 8 + 1) + 8)::int)::text FROM 17)::cstring) INTO var_uuid;
    RETURN var_uuid;
END
$$
LANGUAGE PLpgSQL;

/*inserting seats to seat table */

CREATE OR REPLACE FUNCTION insert_seats_func() RETURNS TRIGGER AS $$
DECLARE
    temp_Model_ID int;
    current_seat int;
    row_num int;
    col char;
    platinum int;
    business int;
    economy int;
    economy_row int;
    business_row int;
    platinum_row int;
    cols char[] DEFAULT array['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    columns_economy char[];
    columns_business char[];
    columns_platinum char[];
BEGIN
    temp_model_id = new.Model_ID;
    SELECT Economy_Seat_Capacity, Business_Seat_Capacity, Platinum_Seat_Capacity, E_seats_per_row, B_seats_per_row, P_seats_per_row INTO economy, business, platinum, economy_row, business_row, platinum_row
    FROM Plane_Type WHERE Model_ID=temp_model_id;

    columns_platinum = cols[: platinum_row];

    current_seat = 1;
    row_num = 1;
    while current_seat <= platinum loop
            foreach col in array columns_platinum loop
                    INSERT INTO Aircraft_Seat VALUES(temp_model_id, CONCAT(row_num, col), 1);
                    current_seat = current_seat + 1;
                end loop;
            row_num = row_num + 1;
        end loop;

    columns_business = cols[: business_row];
    current_seat = 1;

    while current_seat <= business loop
            foreach col in array columns_business loop
                    INSERT INTO Aircraft_Seat VALUES(temp_model_id, CONCAT(row_num, col), 2);
                    current_seat = current_seat + 1;
                end loop;
            row_num = row_num + 1;
        end loop;
    columns_economy = cols[: economy_row];
    current_seat = 1;

    while current_seat <= economy loop
            foreach col in array columns_economy loop
                    INSERT INTO Aircraft_Seat VALUES(temp_model_id, CONCAT(row_num, col), 3);
                    current_seat = current_seat + 1;
                end loop;
            row_num = row_num + 1;
        end loop;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

/*
---------------------------------------------------------------
*/




CREATE TABLE Airport (
  Code varchar(10),
  Country varchar(40) NOT NULL,
  City varchar(40) NOT NULL,
  States varchar(40),
  PRIMARY KEY (Code)
);



CREATE TABLE Airline (
  Airline_Name varchar(30)NOT NULL,
  Airline_Hotline varchar(20)NOT NULL,
  Airline_Email varchar(50)NOT NULL,
  Address_1 varchar(100)NOT NULL,
  Address_2 varchar(100)NOT NULL,
  PRIMARY KEY (Airline_Name)
);





CREATE TABLE User_Category (
  User_Type registered_customer_category NOT NULL,
  Minimum_Bookings varchar(10)NOT NULL,
  Discount numeric(4,2)NOT NULL,
  PRIMARY KEY (User_Type)
);

CREATE TABLE Customer (
  Customer_id uuid4 DEFAULT generate_uuid4 (),
  Customer_Type customer_category_Enum NOT NULL ,
  PRIMARY KEY (Customer_id)
);

CREATE TABLE Registered_Customer_Account (
  Customer_id uuid4,
  Password varchar(50) NOT NULL,
  First_Name varchar(25) NOT NULL,
  Last_Name varchar(25) NOT NULL,
  Gender gender_type_Enum NOT NULL,
  DOB DATE NOT NULL,
  Email varchar(50) NOT NULL UNIQUE,
  Mobile varchar(15)NOT NULL,
  User_Type registered_customer_category NOT NULL DEFAULT 'General',
  Address varchar(80)NOT NULL,
  Country varchar(50)NOT NULL,
  Passport_no varchar(9)NOT NULL,
  No_of_Bookings int NOT NULL,
  Joined TIMESTAMP NOT NULL,
  display_photo bytea,
  PRIMARY KEY (Customer_id),
  FOREIGN KEY (Customer_id) REFERENCES customer (Customer_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(User_Type) REFERENCES User_Category(User_Type) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Guest_Customer_Account (
  Customer_id uuid4,
  First_Name varchar(25) NOT NULL,
  Last_Name varchar(25) NOT NULL,
  Gender gender_type_Enum NOT NULL,
  DOB DATE NOT NULL,
  Passport_no varchar(9) ,
  Email varchar(50) NOT NULL,
  Mobile varchar(15) NOT NULL,
  PRIMARY KEY (Customer_id),
  FOREIGN KEY(Customer_id) REFERENCES Customer(Customer_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Traveller_Class (
  class_id SERIAL,
  class_name class_type_Enum NOT NULL UNIQUE,
  PRIMARY KEY (class_id)
);

CREATE TABLE Plane_Type (
  Model_ID SERIAL,
  Model_Name varchar(30) NOT NULL,
  variant varchar(15) NOT NULL,
  Manufacturer varchar(20) NOT NULL,
  Economy_Seat_Capacity int NOT NULL,
  Business_Seat_Capacity int NOT NULL,
  Platinum_Seat_Capacity int NOT NULL,
  E_seats_per_row int NOT NULL,
  B_seats_per_row int NOT NULL,
  P_seats_per_row int NOT NULL,
  max_load numeric(12,2) NOT NULL,
  fuel_capacity numeric(12,2) NOT NULL,
  PRIMARY KEY (Model_ID)
);


CREATE TABLE Aircraft_Instance (
  Aircraft_ID VARCHAR(10),
  Model_ID int NOT NULL,
  Airline_Name varchar(15) NOT NULL,
  Aircraft_Status aircraft_status_enum NOT NULL,
  Maintenance_Date Date NOT NULL,
  Purchase_Date Date NOT NULL,
  PRIMARY KEY (Aircraft_ID),
  FOREIGN KEY (Airline_Name) REFERENCES Airline(Airline_Name)ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Model_ID) REFERENCES Plane_Type(Model_ID)ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Aircraft_Seat (
  Model_ID int NOT NULL ,
  Seat_ID varchar(10) NOT NULL,
  Traveler_Class_ID int NOT NULL,
  PRIMARY KEY (Model_ID, Seat_ID),
  FOREIGN KEY (Traveler_Class_ID) REFERENCES Traveller_Class(class_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Model_ID) REFERENCES Plane_Type(Model_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Route (
  Route_ID VARCHAR(4),
  Origin varchar(10) NOT NULL,
  Destination varchar(10) NOT NULL,
  Duration interval NOT NULL,
  PRIMARY KEY (Route_ID),
  FOREIGN KEY (Destination) REFERENCES Airport(Code) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Origin) REFERENCES Airport(Code) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Staff (
  Staff_ID VARCHAR(6) NOT NULL ,
  Category Staff_Category NOT NULL,	
  Password varchar(50) NOT NULL,	
  First_Name varchar(30) NOT NULL,
  Last_Name varchar(30) NOT NULL,
  Contact varchar(15) NOT NULL,
  Email varchar(30) NOT NULL UNIQUE,
  DOB DATE NOT NULL,
  Gender gender_type_Enum NOT NULL,
  Assigned_Airport varchar(10) NOT NULL,
  Country varchar(20) NOT NULL,
  PRIMARY KEY (Staff_ID),
  FOREIGN KEY (Assigned_Airport) REFERENCES Airport(Code) ON DELETE CASCADE ON UPDATE CASCADE
);

 


CREATE TABLE Flight_Schedule (
  Flight_ID VARCHAR(5),
  Route_ID VARCHAR(4) NOT NULL,
  Aircraft_ID VARCHAR(10) NOT NULL,
  Arrival_Date Date NOT NULL,
  Arrival_Time TIME NOT NULL,
  Departure_Date Date NOT NULL,
  Departure_Time TIME NOT NULL,
  Flight_Status Flight_Status_Enum NOT NULL,
  Staff_ID varchar(5) NOT NULL UNIQUE,
  PRIMARY KEY (Flight_ID),
  FOREIGN KEY (Route_ID) REFERENCES Route(Route_ID) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(Aircraft_ID) REFERENCES Aircraft_Instance(Aircraft_ID) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(Staff_ID) REFERENCES Staff(Staff_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Seat_Price (
  Route_ID VARCHAR(4) ,
  class_ID INT ,
  price numeric(10,2) NOT NULL,
  PRIMARY KEY (Route_ID, class_ID),
  FOREIGN KEY (Route_ID) REFERENCES Route(Route_ID)ON DELETE CASCADE ON UPDATE CASCADE, 
  FOREIGN KEY(class_ID) REFERENCES Traveller_Class(class_id) ON DELETE CASCADE ON UPDATE CASCADE

);

CREATE TABLE Booking  (
  Booking_ID SERIAL,
  customer_id varchar(36) NOT NULL,
  Flight_ID VARCHAR(5) ,
  Model_ID int,
  Seat_ID varchar(10) ,
  Seat_Price numeric(10,2) NOT NULL,
  Discount numeric(4,2) NOT NULL,
  Final_Price numeric(10,2) NOT NULL,
  Booking_Status Booking_Status_Enum NOT NULL,
  Booking_Date Date NOT NULL,
  PRIMARY KEY (Booking_ID) ,
  FOREIGN KEY(customer_id) REFERENCES Customer(customer_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Flight_ID) REFERENCES Flight_Schedule(Flight_ID) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Model_ID,Seat_ID) REFERENCES Aircraft_Seat(Model_ID,Seat_ID)ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Passenger_Seat(
    Booking_ID int,
    Model_ID int,
    Seat_ID varchar(10),
    price numeric(10, 2), 
    name varchar(100) NOT NULL,
    passport_no varchar(20) NOT NULL,
    dob date NOT NULL,
    PRIMARY KEY (Booking_ID, Model_ID, Seat_ID),
    FOREIGN KEY(Booking_ID) REFERENCES Booking(Booking_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(Model_ID, Seat_ID) REFERENCES Aircraft_Seat(Model_ID, Seat_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Account (
	Email varchar(30) NOT NULL UNIQUE,
	User_Name VARCHAR(40) NOT NULL UNIQUE,
	password varchar(50) NOT NULL,
	Account_Type Account_Type  NOT NULL,
	PRIMARY KEY (Email),
	FOREIGN KEY (Email) REFERENCES Staff(Email) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (Email) REFERENCES Registered_Customer_Account(Email) ON DELETE CASCADE ON UPDATE CASCADE
	

);



/* SESSION TABLE */

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");



/* TRIGGERS */

CREATE TRIGGER insert_seats_for_new_model AFTER INSERT ON Plane_Type
    FOR EACH ROW EXECUTE PROCEDURE insert_seats_func();