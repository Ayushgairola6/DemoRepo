const controller = require("../controller/FeedController");
const express = require("express");
const FeedRouter = express.Router();


FeedRouter.post("/feed/recommendation/filtered/profiles",controller.data.Get_Profiles);


exports.route = {FeedRouter};
