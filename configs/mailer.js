// IMPORTING REQUIRED DEPENDICIES 
const nodemailer = require("nodemailer");
require("dotenv").config();

// SETUP TRANSPORTER FOR SENDING MAILS VIA GMAIL
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});

// FUNCTION TO SEND MAILS VIA GMAIL
const sendMail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.APP_EMAIL,
            to,
            subject,
            text,
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

// EXPORTING THE FUNCTION FOR USAGE
module.exports = sendMail;
