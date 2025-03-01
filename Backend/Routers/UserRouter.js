const express = require("express");
const UserRouter  = express.Router();
const controller = require("../controller/usercontroller")



UserRouter.post("/Register",controller.data.upload.single("image"),controller.data.Register)
.post("/login",controller.data.Login)
.post("/resetPassword",controller.data.ResetPassword)
.get("/welcome",controller.data.verifyToken,controller.data.WelcomeMessage)
.post('/verify',controller.data.verifyToken)
.post("/media/upload/images",controller.data.upload.array("files"),controller.data.UploadMedia)
.get("/profile/data",controller.data.SendUserData)
.post("/profile/update",controller.data.UpdateProfile)
.post("/media/delete",controller.data.DeleteImage)

exports.Route = {UserRouter};