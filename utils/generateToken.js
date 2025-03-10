// IMPORTING REQUIREMENTS
const jwt = require('jsonwebtoken')
require('dotenv').config();

// FUNCTION TO GENERATE JWT TOKEN FOR USERS
const generateToken = (user) => {
        return jwt.sign ({userId:user._id } , process.env.JWT_SECRET, { expiresIn: "5h" });
};

// EXPORTING THE FUNCTION
module.exports = { generateToken }