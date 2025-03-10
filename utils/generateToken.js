const jwt = require('jsonwebtoken')
require('dotenv').config();

const generateToken = (user) => {
        return jwt.sign ({userId:user._id } , process.env.JWT_SECRET, { expiresIn: "5h" });
};

module.exports = { generateToken }