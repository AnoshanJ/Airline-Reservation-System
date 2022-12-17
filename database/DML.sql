insert into Airline values ("B - Airways", "0005AB");
insert into Plane_Type values("T00001", "A380", "Airbus", 500, 9000);
insert into Aircraft values("A00001", "0005AB", "2022-10-10", "2010-10-05", "T00001");
insert into Pilot values ("P00001", "Capt. Sully");
insert into Airport values("HRI", "Sri Lanka", "Colombo", null);
insert into Airport values("JFK", "USA", "New York", "New York");
insert into Account values ("emilytina", "SAfg7G36fZwKGIh", "Emily","Tina" , "emil123@gmail.com", "(555) 555-1234");
insert into User values ("R0000001", "Gold", "emilytina", 9 );
insert into Flight values ("F0000001", "2022-10-10", '2022-10-10 12:45:56', "2022-10-8", '2022-10-10 12:00:00', "A00001", "P00001" , "HRI", "JFK");
insert into Booking values ("R0000001", "B0000001", "Booked");
insert into Ticket values ("T0000001", "2022-10-10", "B0000001", "F0000001");
insert into Passenger values("P0000001", "T0000001", "Emily", "Tina","148, Hilltop Ave.Far Rockaway, New York", "emil123@gmail.com", "(555) 555-1234", "1989-12-12", "R0000001" )

