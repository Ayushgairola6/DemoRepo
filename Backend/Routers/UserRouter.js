const express = require("express");
const UserRouter = express.Router();
const controller = require("../controller/usercontroller")
const { verifyToken } = require("../index.js")
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

UserRouter.post("/Register", controller.data.upload.single("image"), controller.data.Register)
  .post("/login", controller.data.Login)
  .post("/resetPassword", verifyToken, controller.data.ResetPassword)
  .get("/welcome", controller.data.WelcomeMessage)
  .post("/media/upload/images", verifyToken, controller.data.upload.array("files"), controller.data.UploadMedia)
  .get("/profile/data", verifyToken, controller.data.SendUserData)
  .post("/profile/update", verifyToken, controller.data.UpdateProfile)
  .post("/media/delete", verifyToken, controller.data.DeleteImage)
  .post("/media/download", verifyToken, controller.data.DownloadMedia)
  .get("/all/requests", verifyToken, controller.data.SendSelectedUser)
  .post("/accept/:requested_user", verifyToken, controller.data.AcceptMatchRequest)
  .delete("/reject/request/:rejecteduser", verifyToken, controller.data.RejectRequests)
  .get("/find/user/data/:RequestedUser", verifyToken, controller.data.SendSpecifiProfile);
//verify the user token
UserRouter.post('/verify', verifyToken, (req, res) => {
  const token = req.cookies["auth-token"];
  const fallbackToken = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
  const finalToken = token || fallbackToken; // Prioritize cookie token, fallback to header

  if (!finalToken) {
    return res.status(400).json({ message: "No authentication token found" });
  }

  jwt.verify(finalToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }

    return res.status(200).json({ message: "Token Verified", user: decoded });

  })
});

exports.Route = { UserRouter };