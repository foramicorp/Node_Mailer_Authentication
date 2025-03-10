// IMPORTING  REQUIREMENTS
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { generateToken } = require("../utils/generateToken");
const sendMail = require("../configs/mailer");
require("dotenv").config();

// CREATING USER 
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // HASHING PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,  // SAVING HASHED PASSWORD
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

// LOGIN USER 
const login = async (req, res) => {
    try {
        // FINDING USER
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        console.log("Entered Password:", password);
        console.log("Stored Hashed Password:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // GENERATING TOKEN 
        const token = generateToken(user);
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
};

// FORGOT PASSWORD 
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // GENERATE A UNIQUE RESET TOKEN AND EXPIERY TIME
        const resetToken = generateToken(user);
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry
        await user.save();

        // SEND RESET EMAIL TO USER
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        await sendMail(user.email, "Password Reset", `Click here to reset your password: ${resetUrl}`);

        res.json({ message: "Password reset email sent" });
    } catch (error) {
        res.status(500).json({ message: "Error sending email" });
    }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // HASH AND UPDATE NEW PASSWORD
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        // SEND PASSWORD RESET CONFIRMATION MAIL
        await sendMail(
            user.email,
            "Password Reset Confirmation",
            `Hello ${user.name},\n\nYour password has been successfully reset. If you did not make this change, please contact support immediately.\n\nThank you!`
        );

        res.json({ message: "Password reset successful. A confirmation email has been sent." });

    } catch (error) {
        res.status(500).json({ message: "Error resetting password" });
    }
};

// EXPORTING THE CONTROLLERS

module.exports = { signup, login, forgotPassword, resetPassword };