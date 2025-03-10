// IMPORTING REQUIREMENTS
const mongoose = require('mongoose');

// USER SCHEMA 
const userSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
})

// MODELING THE USER COLLECTION
const User = mongoose.model('User', userSchema);

// EXPORTING THE USER MODEL
module.exports = User;

// IMPORTING REQUIREMENTS
const bcrypt = require("bcrypt");

// PLAIN TEXT PASSWORD VALIDATION
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    console.log("Hashing password:", this.password);
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
