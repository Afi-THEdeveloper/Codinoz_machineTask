const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");

userRouter.post("/login", userController.loginUser);

module.exports = userRouter;
