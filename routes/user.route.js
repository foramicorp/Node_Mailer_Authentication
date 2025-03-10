// IMPORTING REQUIREMENTS
const Router = require('express');
const { signup, login, forgotPassword, resetPassword } = require('../controllers/user.controller');

// ROUTING FOR USERS
const userRouter = Router();

// USER ROUTES
userRouter.post("/signup" , signup);
userRouter.post("/login" , login);
userRouter.post("/forgot-password" , forgotPassword);
userRouter.post("/reset-password" , resetPassword);

// EXPORTING USER ROUTER
module.exports = userRouter;


