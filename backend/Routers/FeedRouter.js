const controller = require("../controller/FeedController");
const express = require("express");
const FeedRouter = express.Router();


FeedRouter.post("/feed/recommendation/filtered/profiles",controller.data.Get_Profiles)
.get("/feed/profiles",controller.data.SendProfiles)
.post("/like/:id",controller.data.HandleLikes);


exports.route = {FeedRouter};
