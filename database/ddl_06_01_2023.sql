\c postgres
DROP DATABASE IF EXISTS airline_res;
CREATE DATABASE airline_res;
\c airline_res

DROP TRIGGER IF EXISTS insert_seats_for_new_model ON Plane_Type;
DROP TRIGGER IF EXISTS update_customer_bookings  ON Booking;
DROP TRIGGER IF EXISTS update_customer_category ON registered_customer_account;


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
DROP TABLE IF EXISTS Guest_Customer_Account CASCADE;
DROP TABLE IF EXISTS Passenger_Seat CASCADE;


DROP TYPE IF EXISTS  Booking_Status_Enum;
DROP TYPE IF EXISTS  Flight_Status_Enum;
DROP TYPE IF EXISTS  aircraft_status_Enum;
DROP TYPE IF EXISTS  gender_type_Enum;
DROP TYPE IF EXISTS  customer_category_Enum;
DROP TYPE IF EXISTS  registered_customer_category;
DROP TYPE IF EXISTS class_type_Enum;
DROP TYPE IF EXISTS Staff_Category;


DROP FUNCTION IF EXISTS insertBooking;
DROP FUNCTION IF EXISTS get_seat_price;


DROP DOMAIN IF EXISTS UUID4 CASCADE;

SET TIME ZONE 'Etc/UTC';


/*
  ______  _   _  _    _  __  __   _____ 
 |  ____|| \ | || |  | ||  \/  | / ____|
 | |__   |  \| || |  | || \  / || (___  
 |  __|  | . ` || |  | || |\/| | \___ \ 
 | |____ | |\  || |__| || |  | | ____) |
 |______||_| \_| \____/ |_|  |_||_____/
*/
----------ENUM----------------------------


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





/*_____    ____   __  __            _____  _   _   _____ 
 |  __ \  / __ \ |  \/  |    /\    |_   _|| \ | | / ____|
 | |  | || |  | || \  / |   /  \     | |  |  \| || (___  
 | |  | || |  | || |\/| |  / /\ \    | |  | . ` | \___ \ 
 | |__| || |__| || |  | | / ____ \  _| |_ | |\  | ____) |
 |_____/  \____/ |_|  |_|/_/    \_\|_____||_| \_||_____/ 
                                                          */
---------------------------DOMAINS---------------------------


CREATE DOMAIN UUID4 AS char(36)
CHECK (VALUE ~ '[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}');



/*______  _    _  _   _   _____  _______  _____  ____   _   _   _____ 
 |  ____|| |  | || \ | | / ____||__   __||_   _|/ __ \ | \ | | / ____|
 | |__   | |  | ||  \| || |        | |     | | | |  | ||  \| || (___  
 |  __|  | |  | || . ` || |        | |     | | | |  | || . ` | \___ \ 
 | |     | |__| || |\  || |____    | |    _| |_| |__| || |\  | ____) |
 |_|      \____/ |_| \_| \_____|   |_|   |_____|\____/ |_| \_||_____/ 
                                                                      */
---------------------------FUNCTIONS----------------------------------


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


------------------------function to calculate age--------------------------------------

CREATE OR REPLACE FUNCTION get_age( dob date )
RETURNS int
AS $CODE$
BEGIN
    RETURN date_part('year', age(dob))::int;
END
$CODE$
LANGUAGE plpgsql IMMUTABLE;



--------------------------inserting seats to seat table----------------------------------

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

-------------------------Function to get a time stamp from date and time-------------------------------------

CREATE OR REPLACE FUNCTION get_timestamp(val_date DATE, val_time TIME)
RETURNS timestamp
AS $CODE$
DECLARE
val_datetime timestamp;
BEGIN
  val_datetime := (val_date||' '||val_time)::timestamp ;
  RETURN val_datetime;
END
$CODE$
LANGUAGE plpgsql IMMUTABLE;


-------------------------Function to calculate arrival time for a flight------------------------------------

CREATE OR REPLACE FUNCTION get_arrival(val_route_id VARCHAR(4), val_departure_datetime timestamp)
RETURNS timestamp
AS $CODE$
DECLARE
  val_duration interval;
  val_arrival_datetime timestamp;
BEGIN
  SELECT Duration INTO val_duration FROM route WHERE Route_ID=val_route_id;
  val_arrival_datetime = val_departure_datetime + val_duration;
  RETURN val_arrival_datetime;
END
$CODE$
LANGUAGE plpgsql IMMUTABLE;

--------------------------Function to get the price of a seat---------------------------------------------

CREATE OR REPLACE FUNCTION get_seat_price(val_flight_id varchar(4), val_seat_id text)
RETURNS numeric
AS $CODE$
DECLARE
    val_route_id VARCHAR(4);
    val_model_id int;
    val_aircraft_id VARCHAR(4);
    val_traveler_class_id int;
    val_price numeric;
BEGIN
    SELECT Route_ID, Aircraft_ID INTO val_route_id, val_aircraft_id FROM Flight_Schedule WHERE Flight_ID = val_flight_id;
    SELECT Model_ID INTO val_model_id FROM aircraft_instance WHERE Aircraft_ID = val_aircraft_id;
    SELECT aircraft_seat.traveler_class_id INTO val_traveler_class_id FROM Aircraft_Seat WHERE Model_ID = val_model_id AND Seat_ID = val_seat_id;
    SELECT price into val_price FROM Seat_Price WHERE Route_ID = val_route_id AND class_id = val_traveler_class_id;
    RETURN val_price;
END
$CODE$
LANGUAGE plpgsql IMMUTABLE;

----------------------Function to check for seat overlaps---------------------------------------------------

CREATE OR REPLACE FUNCTION check_seat_overlaps(val_flight_id varchar(4), seatNo varchar(10)[])
RETURNS bool
LANGUAGE plpgsql
AS $$
DECLARE
	bookingIDs int[];
	bookedSeats varchar(10)[];
	bookingID int;
BEGIN
	bookingIDs := ARRAY (SELECT Booking_ID FROM Booking WHERE Flight_ID=val_flight_id);

	FOREACH bookingID in ARRAY bookingIDs
	LOOP
		bookedSeats := bookedSeats || ARRAY (SELECT Seat_ID FROM passenger_seat WHERE Booking_ID = bookingID);
	END LOOP;

	IF (seatNo && bookedSeats) THEN
		RETURN true;
	ELSE
	    RETURN false;
	END IF;
END;
$$;

-------------------------Function to create a booking ---------------------------------------------

CREATE OR REPLACE FUNCTION insertBooking(
  	val_Passport_no varchar(10),
    val_flight_id varchar(4),
    passName text[],
    passPassport text[],
    passDob date[],
    seatNo varchar(10)[],
    val_First_Name VARCHAR(25),
  	val_Last_Name VARCHAR(25),
  	val_gender gender_type_enum,
    val_dob DATE,
  	val_email VARCHAR(50),
  	val_mobile VARCHAR(15),
    val_type VARCHAR(20)
)
RETURNS int
LANGUAGE plpgsql
AS $$
DECLARE
    pass_count int := array_length(seatNo, 1);
    i int = 1;
    j int = 1;
    tot_price numeric(10,2) = 0;
    seat_price numeric(10,2)[];
    temp_price numeric(10,2);
    val_booking_id int;
    val_model_id int;
    Final_Price numeric(10,2);
    val_discount_percentage numeric(10,2);
    cust_type customer_category_Enum;
    var_x varchar(10) := (SELECT customer_type FROM Customer WHERE Passport_no = val_passport_no);
BEGIN

    IF (check_seat_overlaps(val_flight_id, seatNo) = true) THEN
        RAISE EXCEPTION 'The selected seat has been taken. Please select a different seat';
    END IF;
	
    SELECT customer_type INTO cust_type FROM Customer WHERE Passport_no = val_passport_no;
    
    

    IF (val_type = 'guest' AND var_x is null) THEN
	INSERT INTO customer values (val_Passport_no,'guest');
        INSERT INTO guest_customer_account(First_Name,Last_name,Gender,DOB,Passport_no,Email,Mobile)
        values (val_First_Name, val_Last_Name, val_gender, val_dob, val_passport_no, val_email, val_mobile);
    END IF;

    WHILE i < pass_count+1 LOOP
            temp_price = get_seat_price(val_flight_id, seatNo[i]);
            tot_price = tot_price + temp_price;
            seat_price = array_append(seat_price, temp_price);
            i = i + 1;
    END LOOP;

    Final_Price = tot_price;

    IF (val_type = 'registered') THEN
        SELECT Discount INTO val_discount_percentage FROM registered_customer_account JOIN User_Category ON registered_customer_account.user_type = User_Category.user_type WHERE passport_no = val_Passport_no;
        Final_Price = tot_price * (1 - val_discount_percentage/100);
    END IF;

    

    SELECT Model_ID INTO val_model_id FROM Aircraft_Instance NATURAL JOIN Flight_Schedule WHERE Flight_Schedule.flight_id=val_flight_id;

    INSERT INTO Booking(Passport_no, Flight_ID, model_id, seat_ids,Seat_Price,Discount ,Final_Price, Booking_Status) VALUES(val_Passport_no, val_flight_id, val_model_id, seatNo,tot_price,val_discount_percentage,Final_Price, 'Not paid') RETURNING Booking_ID INTO val_booking_id;


    WHILE j < pass_count+1 LOOP
            INSERT INTO Passenger_Seat VALUES(val_booking_id, val_model_id, seatNo[j], seat_price[j], passName[j], passPassport[j], passDob[j]);
            j = j + 1;
    END LOOP;
    RETURN val_booking_id;
END;
$$;


-----------------------FUNCTION TO INCREMENT BOOKINGS WITH TRIGGER--------------------------------

CREATE OR REPLACE FUNCTION increment_customer_bookings() RETURNS TRIGGER AS $$
DECLARE
   cust_type customer_category_Enum;
BEGIN
    IF (NEW.Booking_Status = 'Paid') THEN
        SELECT customer_type INTO cust_type FROM Customer WHERE Passport_no = NEW.Passport_no;
           IF (cust_type = 'registered') THEN
               UPDATE Registered_Customer_Account SET No_of_Bookings = No_of_Bookings + 1 WHERE Passport_no = NEW.Passport_no;
           END IF;
    END IF;
    RETURN NULL; -- result is ignored since this is an AFTER trigger
END;
$$ LANGUAGE plpgsql;


---------------------------FUNCTION TO INCREMENT BOOKINGS WITH TRIGGER-----------------------------------

CREATE OR REPLACE FUNCTION change_customer_category() RETURNS TRIGGER AS $$
DECLARE
   frequent_min INT;
   gold_min INT;
BEGIN

    SELECT minimum_bookings INTO frequent_min FROM user_category WHERE user_type='Frequent';
    SELECT minimum_bookings INTO gold_min FROM user_category WHERE user_type='Gold';

    IF (NEW.No_of_Bookings >= gold_min) THEN
        UPDATE registered_customer_account SET user_type = 'Gold' WHERE Passport_no = NEW.Passport_no;
        RETURN NULL;
    ELSIF (NEW.No_of_Bookings >= frequent_min) THEN
        UPDATE registered_customer_account SET user_type = 'Frequent' WHERE Passport_no = NEW.Passport_no;
        RETURN NULL;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;



/*
  _______         ____   _       ______   _____ 
 |__   __| /\    |  _ \ | |     |  ____| / ____|
    | |   /  \   | |_) || |     | |__   | (___  
    | |  / /\ \  |  _ < | |     |  __|   \___ \ 
    | | / ____ \ | |_) || |____ | |____  ____) |
    |_|/_/    \_\|____/ |______||______||_____/ 
                                                
*/

----------------------TABLES-------------------------------


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
  Passport_no varchar(9) ,
  Customer_Type customer_category_Enum NOT NULL ,
  PRIMARY KEY (Passport_no)
);

CREATE TABLE Registered_Customer_Account (
  Password varchar(100) NOT NULL,
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
  PRIMARY KEY (Passport_no),
  FOREIGN KEY (Passport_no) REFERENCES customer (Passport_no) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(User_Type) REFERENCES User_Category(User_Type) ON DELETE CASCADE ON UPDATE CASCADE
  	
);

CREATE TABLE Guest_Customer_Account (
  First_Name varchar(25) NOT NULL,
  Last_Name varchar(25) NOT NULL,
  Gender gender_type_Enum NOT NULL,
  DOB DATE NOT NULL,
  Passport_no varchar(9) ,
  Email varchar(50) NOT NULL,
  Mobile varchar(15) NOT NULL,
  PRIMARY KEY (Passport_no)
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
  Staff_ID uuid4 DEFAULT generate_uuid4 (),
  Category Staff_Category NOT NULL,	
  Password varchar(100) NOT NULL,	
  First_Name varchar(30) NOT NULL,
  Last_Name varchar(30) NOT NULL,
  Contact varchar(15) NOT NULL,
  Email varchar(30) NOT NULL ,
  DOB DATE NOT NULL,
  Gender gender_type_Enum NOT NULL,
  Assigned_Airport varchar(10) NOT NULL,
  Country varchar(20) NOT NULL,
  PRIMARY KEY (Email),
  FOREIGN KEY (Assigned_Airport) REFERENCES Airport(Code) ON DELETE CASCADE ON UPDATE CASCADE
  	
);



CREATE TABLE Flight_Schedule (
  Flight_ID VARCHAR(5),
  Route_ID VARCHAR(4) NOT NULL,
  Aircraft_ID VARCHAR(10) NOT NULL,
  Arrival_Date Date generated always as (get_arrival(route_id,get_timestamp(departure_date,departure_time))::DATE) stored NOT NULL,
  Arrival_Time TIME generated always as (get_arrival(route_id,get_timestamp(departure_date,departure_time))::TIME) stored NOT NULL,
  Departure_Date Date NOT NULL,
  Departure_Time TIME NOT NULL,
  Flight_Status Flight_Status_Enum NOT NULL DEFAULT 'Scheduled',
  PRIMARY KEY (Flight_ID),
  FOREIGN KEY (Route_ID) REFERENCES Route(Route_ID) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(Aircraft_ID) REFERENCES Aircraft_Instance(Aircraft_ID) ON DELETE CASCADE ON UPDATE CASCADE
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
  Passport_no varchar(9) NOT NULL,
  Flight_ID VARCHAR(5) ,
  Seat_IDs VARCHAR[] ,
  Model_ID int,
  Seat_Price numeric(10,2) NOT NULL,
  Discount numeric(4,2),
  Final_Price numeric(10,2) NOT NULL,
  Booking_Status Booking_Status_Enum NOT NULL,
  Booking_Date DATE NOT NULL DEFAULT NOW()::DATE,
  PRIMARY KEY (Booking_ID) ,
  FOREIGN KEY (Passport_no) REFERENCES Customer(Passport_no)ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Flight_ID) REFERENCES Flight_Schedule(Flight_ID) ON DELETE CASCADE ON UPDATE CASCADE
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

-------------------------SESSION TABLE-------------------------------------

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");



/*_______  _____   _____  _____   _____  ______  _____    _____ 
 |__   __||  __ \ |_   _|/ ____| / ____||  ____||  __ \  / ____|
    | |   | |__) |  | | | |  __ | |  __ | |__   | |__) || (___  
    | |   |  _  /   | | | | |_ || | |_ ||  __|  |  _  /  \___ \ 
    | |   | | \ \  _| |_| |__| || |__| || |____ | | \ \  ____) |
    |_|   |_|  \_\|_____|\_____| \_____||______||_|  \_\|_____/ 
                                                                 */
---------------------------TRIGGERS--------------------------------


CREATE TRIGGER update_customer_bookings
AFTER UPDATE OF booking_status ON Booking
    FOR EACH ROW EXECUTE PROCEDURE increment_customer_bookings();
    
CREATE TRIGGER update_customer_category
AFTER UPDATE OF no_of_bookings ON registered_customer_account
    FOR EACH ROW EXECUTE PROCEDURE change_customer_category();
    
CREATE TRIGGER insert_seats_for_new_model AFTER INSERT ON Plane_Type
    FOR EACH ROW EXECUTE PROCEDURE insert_seats_func();


    
/*_____   _____    ____    _____  ______  _____   _    _  _____   ______   _____ 
 |  __ \ |  __ \  / __ \  / ____||  ____||  __ \ | |  | ||  __ \ |  ____| / ____|
 | |__) || |__) || |  | || |     | |__   | |  | || |  | || |__) || |__   | (___  
 |  ___/ |  _  / | |  | || |     |  __|  | |  | || |  | ||  _  / |  __|   \___ \ 
 | |     | | \ \ | |__| || |____ | |____ | |__| || |__| || | \ \ | |____  ____) |
 |_|     |_|  \_\ \____/  \_____||______||_____/  \____/ |_|  \_\|______||_____/ 
*/    
----------------------------------PROCEDURES--------------------------------------

    
-------------------------- Procedure to register staff member -------------------------------------

CREATE OR REPLACE PROCEDURE registerStaff(
  val_category Staff_Category,
  val_Password varchar(100),
  val_First_Name VARCHAR(30),
  val_Last_Name VARCHAR(30),
  val_Contact VARCHAR(15),
  val_Email VARCHAR(100),
  val_DOB DATE,
  val_Gender gender_type_Enum,
  val_Country VARCHAR(20),
  val_Airport VARCHAR(10)        
)

LANGUAGE plpgsql    
AS $$
DECLARE
Staff_ID uuid4;
var_existing_email varchar(100) := (SELECT Email from Staff where Email = val_Email);
BEGIN
    if (var_existing_email is null) then
       Staff_ID := generate_uuid4();       
            INSERT INTO staff(Staff_ID,Category,Password,First_Name,Last_Name,Contact,Email,DOB,Gender,Country)
            VALUES (Staff_ID,val_category,val_Password,val_First_Name,val_Last_Name,val_Contact,val_Email,val_DOB,val_Gender,val_Country);
  
    else
        RAISE EXCEPTION 'Email % is already registered',val_Email;
    end if;
END;
$$;    

---------------------PROCEDURE FOR ADDING SEAT PRICES---------------------------

CREATE OR REPLACE PROCEDURE insert_route_price(varchar,numeric,numeric,numeric)
LANGUAGE plpgsql
AS $$

BEGIN
	INSERT INTO Seat_Price VALUES ($1,1,$2);
	INSERT INTO Seat_Price VALUES ($1,2,$3);
	INSERT INTO Seat_Price VALUES ($1,3,$4);

END;
$$;

/*_____  _   _  _____   ______ __   __
 |_   _|| \ | ||  __ \ |  ____|\ \ / /
   | |  |  \| || |  | || |__    \ V / 
   | |  | . ` || |  | ||  __|    > <  
  _| |_ | |\  || |__| || |____  / . \ 
 |_____||_| \_||_____/ |______|/_/ \_\
                                       */
--------------------INDEX------------------------------

CREATE INDEX INDEX_Schedule_Route_ID ON Flight_Schedule (Route_ID);
CREATE INDEX INDEX_Booking_Schedule_ID ON Booking (Flight_ID);
