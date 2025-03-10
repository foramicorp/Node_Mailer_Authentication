// IMPORTING REQUIRED DEPENDENCIES 
const mongoose = require('mongoose');
require('dotenv').config();

// FUNCTION TO CONNEXT TO MONGODB
const dbConnect = async () => {
    mongoose.connect(process.env.DB_URL);
    console.log("connected to the database");
}

// EXPORTING THE FUNCTION DBCONNECT
module.exports = dbConnect;

