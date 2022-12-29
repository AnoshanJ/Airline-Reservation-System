const pool = require("./db.js");

const RegisteredUserAccount = function (registeredUserAccount) {
    this.password = registeredUserAccount.password;
    this.first_name = registeredUserAccount.first_name;
    this.last_name = registeredUserAccount.last_name;
    this.gender = registeredUserAccount.gender;
    this.dob = registeredUserAccount.dob;
    this.email = registeredUserAccount.email;
    this.mobile = registeredUserAccount.mobile;
    this.user_type = registeredUserAccount.user_type;
    this.address = registeredUserAccount.address;
    this.country = registeredUserAccount.country;
    this.passport_no = registeredUserAccount.passport_no;
    this.no_of_bookings = registeredUserAccount.no_of_bookings;
    this.joined = registeredUserAccount.joined;
    this.display_photo = registeredUserAccount.display_photo;
};

RegisteredUserAccount.getUserByEmail = function (email, result) {
    const sql = "SELECT * FROM registered_user_account WHERE email = $1";
    const queryParams = [email];
    pool.query(sql, queryParams, function (err, res) {
        if (err) {
            console.log("error: ", err);
            return result(err, null);
        } else {
            console.log("Retrieved user: ", res.rows);
            return result(null, res.rows);
        }
    });
};

// RegisteredUserAccount.createUser = function (newUser, result) {

//     const sql = "INSERT INTO Customer(Passport_no, Customer_Type) VALUES($11, $8); "+
//     "INSERT INTO registered_customer_account (password, first_name, last_name, gender, dob, email, mobile, user_type, address, country, Passport_no, no_of_bookings,joined, display_photo) "+
//     "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, CURRENT_TIMESTAMP, $13);";
//     const queryParams = [
//         newUser.password,
//         newUser.first_name,
//         newUser.last_name,
//         newUser.gender,
//         newUser.dob,
//         newUser.email,
//         newUser.mobile,
//         newUser.user_type,
//         newUser.address,
//         newUser.country,
//         newUser.passport_no,
//         newUser.no_of_bookings,
//         newUser.display_photo
//     ];
//     pool.query(sql, queryParams, function (err, res) {
//         if (err) {
//             console.log("error: ", err);
//             return result(err, null);
//         } else {
//             console.log("Created user: ", { id: res.insertId, ...newUser });
//             return result(null, { id: res.insertId, ...newUser });
//         }
//     });
// };

RegisteredUserAccount.createUser = function (newUser, result) {
    pool.connect(function (err, client, release) {
    if (err) {
    console.log("Error getting connection: ", err);
    return result(err, null);
    }
    client.query("BEGIN", function (err) {
    if (err) {
    console.log("Error beginning transaction: ", err);
    release();
    return result(err, null);
    }
    const sql1 = "INSERT INTO Customer(Passport_no, Customer_Type) VALUES($1, $2)";
    const queryParams1 = [newUser.passport_no, "registered"];
    client.query(sql1, queryParams1, function (err, res) {
    if (err) {
    console.log("Error executing statement 1: ", err);
    client.query("ROLLBACK", function () {
    release();
    return result(err, null);
    });
    }
    const sql2 = "INSERT INTO registered_customer_account (password, first_name, last_name, gender, dob, email, mobile, user_type, address, country, Passport_no, no_of_bookings, joined, display_photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, CURRENT_TIMESTAMP, $13)";
    const queryParams2 = [
    newUser.password,
    newUser.first_name,
    newUser.last_name,
    newUser.gender,
    newUser.dob,
    newUser.email,
    newUser.mobile,
    newUser.user_type,
    newUser.address,
    newUser.country,
    newUser.passport_no,
    newUser.no_of_bookings,
    newUser.display_photo,
    ];
    client.query(sql2, queryParams2, function (err, res) {
    if (err) {
    console.log("Error executing statement 2: ", err);
    client.query("ROLLBACK", function () {
    release();
    return result(err, null);
    });
    }
    client.query("COMMIT", function (err) {
    if (err) {
    console.log("Error committing transaction: ", err);
    client.query("ROLLBACK", function () {
    release();
    return result(err, null);
    });
    } else {
    console.log("Created user: ", { id: res.insertId, ...newUser });
    release();
    return result(null, { id: res.insertId, ...newUser });
    }
    });
    });
    });
    });
    });
    };
  


module.exports = RegisteredUserAccount;

