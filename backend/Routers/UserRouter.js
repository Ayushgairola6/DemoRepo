const express = require("express");
const UserRouter  = express.Router();
const controller = require("../controller/usercontroller")



UserRouter.post("/Register",controller.data.upload.single("image"),controller.data.Register)
.post("/login",controller.data.Login)
.post("/resetPassword",controller.data.ResetPassword)
.get("/welcom",controller.data.verifyToken,controller.data.WelcomeMessage)

exports.Route = {UserRouter};