const express = require("express");
const UserRouter  = express.Router();
const controller = require("../controller/usercontroller")
const {verifyToken} = require("../index.js")



UserRouter.post("/Register",controller.data.upload.single("image"),controller.data.Register)
.post("/login",controller.data.Login)
.post("/resetPassword",verifyToken,controller.data.ResetPassword)
.get("/welcome",controller.data.WelcomeMessage)
.post('/verify',verifyToken)
.post("/media/upload/images",verifyToken,controller.data.upload.array("files"),controller.data.UploadMedia)
.get("/profile/data",verifyToken,controller.data.SendUserData)
.post("/profile/update",verifyToken,controller.data.UpdateProfile)
.post("/media/delete"verifyToken,controller.data.DeleteImage)
.post("/media/download",verifyToken,controller.data.DownloadMedia)

exports.Route = {UserRouter};