const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");

userRouter
  .post("/login", userController.loginUser)
  .post("/register", userController.registerUser)
  .post("/verifyOtp", userController.verifyOtp)
  .post("/resendOtp", userController.ResendOtp)
  .post("/login", userController.loginUser)

module.exports = userRouter;
