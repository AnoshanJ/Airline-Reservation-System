drop database if exists airline_res;
create database airline_res;
use airline_res;


CREATE TABLE `Airline` (
  `Airline_Name` varchar(30),
  `Airline_ID` varchar(15),
  PRIMARY KEY (`Airline_ID`)
);

CREATE TABLE `Account` (
  `User_Name` varchar(25),
  `Password` varchar(15),
  `First_Name` varchar(15),
  `Last_Name` varchar(15),
  `Email` varchar(35),
  `Mobile` varchar(20),
  PRIMARY KEY (`User_Name`)
);

CREATE TABLE `User` (
  `User_ID` varchar(10),
  `User_Type` varchar(15),
  `User_Name` varchar(25),
  `Discount` numeric(4,2),
  PRIMARY KEY (`User_ID`),
  FOREIGN KEY (`User_Name`) REFERENCES `Account`(`User_Name`)
);

CREATE TABLE `Plane_Type` (
  `Type_ID` varchar(6),
  `Model` varchar(5),
  `Brand` varchar(20),
  `Seats` numeric(5,0),
  `Range` numeric(10,0),
  PRIMARY KEY (`Type_ID`)
);
CREATE TABLE `Aircraft` (
  `Aircraft_ID` varchar(6),
  `Airline_ID` varchar(15),
  `Maintenance_Date` Date,
  `Purchase_Date` Date,
  `Type_ID` varchar(6),
  PRIMARY KEY (`Aircraft_ID`),
  FOREIGN KEY (`Airline_ID`) REFERENCES `Airline`(`Airline_ID`),
  FOREIGN KEY (`Type_ID`) REFERENCES `Plane_Type`(`Type_ID`)
  
);
CREATE TABLE `Pilot` (
  `Pilot_ID` varchar(6),
  `Name` varchar(20),
  PRIMARY KEY (`Pilot_ID`)
);
CREATE TABLE `Airport` (
  `Code` varchar(4),
  `Country` varchar(20),
  `City` varchar(20),
  `State` varchar(20),
  PRIMARY KEY (`Code`)
);
CREATE TABLE `Flight` (
  `Flight_ID` varchar(10),
  `Arrival_Date` Date,
  `Arrival_Time` DATETIME,
  `Departure_Date` Date,
  `Departure_Time` DATETIME,
  `Aircraft_ID` varchar(6),
  `Pilot_ID` varchar(6),
  `Origin` varchar(4),
  `Destination` varchar(4),
  PRIMARY KEY (`Flight_ID`),
  FOREIGN KEY (`Aircraft_ID`) REFERENCES `Aircraft`(`Aircraft_ID`),
  FOREIGN KEY (`Pilot_ID`) REFERENCES `Pilot`(`Pilot_ID`),
  FOREIGN KEY (`Origin`) REFERENCES `Airport`(`Code`),
  FOREIGN KEY (`Destination`) REFERENCES `Airport`(`Code`)
);
CREATE TABLE `Booking` (
  `User_ID` varchar(10),
  `Booking_ID` varchar(10),
  `Status` varchar(15),
  PRIMARY KEY (`Booking_ID`),
  FOREIGN KEY (`User_ID`) REFERENCES `User`(`User_ID`)
);

CREATE TABLE `Ticket` (
  `Ticket_ID` varchar(20),
  `Date` DATE,
  `Booking_ID` varchar(10),
  `Flight_ID` varchar(10),
  PRIMARY KEY (`Ticket_ID`),
  FOREIGN KEY (`Flight_ID`) REFERENCES `Flight`(`Flight_ID`),
  FOREIGN KEY (`Booking_ID`) REFERENCES `Booking`(`Booking_ID`)
);

CREATE TABLE `Passenger` (
  `Passenger_ID` varchar(20),
  `Ticket_ID` varchar(20),
  `First_Name` varchar(15),
  `Last_Name` varchar(15),
  `Address` varchar(50),
  `Email` varchar(30),
  `Mobile` varchar(20),
  `Date_Of_Birth` DATE,
  `User_ID` varchar(15),
  PRIMARY KEY (`Passenger_ID`),
  FOREIGN KEY (`Ticket_ID`) REFERENCES `Ticket`(`Ticket_ID`),
  FOREIGN KEY (`User_ID`) REFERENCES `User`(`User_ID`)
);

CREATE TABLE `Consists_Of` (
  `Passenger_ID` varchar(20),
  `Flight_ID` varchar(5),
  PRIMARY KEY (`Passenger_ID`, `Flight_ID`),
  foreign key (Passenger_ID) references Passenger(Passenger_ID)
		on delete cascade,
  foreign key (Flight_ID) references Flight(Flight_ID)
);


CREATE TABLE `Login` (
  `User_name` varchar(25),
  `Password` varchar(15),
  PRIMARY KEY (`User_name`)
);

CREATE TABLE `Flight_Schedule` (
  `Schedule_ID` varchar(5),
  `Date` Date,
  `Flight_ID` varchar(10),
  PRIMARY KEY (`Schedule_ID`),
  FOREIGN KEY (`Flight_ID`) REFERENCES `Flight`(`Flight_ID`)
);
