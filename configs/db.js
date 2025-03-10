const mongoose = require('mongoose');
require('dotenv').config();


const dbConnect = async () => {
    mongoose.connect(process.env.DB_URL);
    console.log("connected to the database");
}

module.exports = dbConnect;

