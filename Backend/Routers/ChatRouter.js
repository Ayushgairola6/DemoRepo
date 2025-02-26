const controller = require("../controller/chatController");
const express = require("express");
const ChatRouter = express.Router();

ChatRouter.get("/all/matches",controller.data.SendMatches)


exports.route = {ChatRouter};