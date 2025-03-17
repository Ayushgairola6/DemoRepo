const controller = require("../controller/FeedController");
const {verifyToken} = require("../index.js")
const express = require("express");
const FeedRouter = express.Router();


FeedRouter.post("/feed/recommendation/filtered/profiles",verifyToken,controller.data.Get_Profiles)
.get("/feed/profiles",verifyToken,controller.data.SendProfiles)
.post("/like/:id",verifyToken,controller.data.HandleLikes);


exports.route = {FeedRouter};
