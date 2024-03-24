const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");
const isloggedMiddleware = require("../middlewares/userVerify");

userRouter
  .post("/login", userController.loginUser)
  .post("/register", userController.registerUser)
  .post("/verifyOtp", userController.verifyOtp)
  .post("/resendOtp", userController.ResendOtp)
  .post("/login", userController.loginUser)

  //protected end point, need middleware to check authorization
  .get("/fetchUser", isloggedMiddleware, userController.fetchUser);

module.exports = userRouter;
