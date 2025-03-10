// IMPORTING REQUIRED DEPENENCIES
const express = require('express');
const dbConnect = require('./configs/db');
const userRouter = require('./routes/user.route');
const app = express();
app.use(express.json());

// WELCOME ROUTE
app.get("/" , (req, res) => {
    res.send('Hello World!');
})

// USER ROUTE
app.use("/api/user" , userRouter);


// STARTING THE SERVER ON PORT 7000 AND CONNECTING TO THE DATABASE
app.listen(7000 , () => {
    console.log('Server is running on port 7000');
    dbConnect();
});