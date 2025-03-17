const controller = require("../controller/FeedController");
const authenticate = require("../controller/userController.js")
const express = require("express");
const FeedRouter = express.Router();


FeedRouter.post("/feed/recommendation/filtered/profiles",authenticate.data.verifyToken,controller.data.Get_Profiles)
.get("/feed/profiles",authenticate.data.verifyToken,controller.data.SendProfiles)
.post("/like/:id",authenticate.data.verifyToken,controller.data.HandleLikes);


exports.route = {FeedRouter};
