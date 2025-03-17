const express = require("express");
const UserRouter  = express.Router();
const controller = require("../controller/usercontroller")



UserRouter.post("/Register",controller.data.upload.single("image"),controller.data.Register)
.post("/login",controller.data.Login)
.post("/resetPassword",authenticate.data.verifyToken,controller.data.ResetPassword)
.get("/welcome",controller.data.WelcomeMessage)
.post('/verify',controller.data.verifyToken)
.post("/media/upload/images",authenticate.data.verifyToken,controller.data.upload.array("files"),controller.data.UploadMedia)
.get("/profile/data",controller.data.verifyToken,controller.data.SendUserData)
.post("/profile/update",authenticate.data.verifyToken,controller.data.UpdateProfile)
.post("/media/delete",authenticate.data.verifyToken,controller.data.DeleteImage)
.post("/media/download",authenticate.data.verifyToken,controller.data.DownloadMedia)

exports.Route = {UserRouter};