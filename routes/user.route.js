const Router = require('express');
const { signup, login, forgotPassword, resetPassword } = require('../controllers/user.controller');

const userRouter = Router();

userRouter.post("/signup" , signup);
userRouter.post("/login" , login);
userRouter.post("/forgot-password" , forgotPassword);
userRouter.post("/reset-password" , resetPassword);

module.exports = userRouter;


