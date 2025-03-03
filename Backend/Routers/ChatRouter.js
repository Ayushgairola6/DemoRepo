const controller = require("../controller/chatController");
const express = require("express");
const ChatRouter = express.Router();

ChatRouter.get("/all/matches",controller.data.SendMatches)
ChatRouter.get("/all/Chats/:roomName",controller.data.SendChats)


exports.route = {ChatRouter};