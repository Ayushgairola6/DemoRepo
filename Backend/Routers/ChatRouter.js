const controller = require("../controller/chatController");
const express = require("express");
const ChatRouter = express.Router();
const authenticate = require("../controller/userController.js")

ChatRouter.get("/all/matches",authenticate.data.verifyToken,controller.data.SendMatches)
ChatRouter.get("/all/Chats/:roomName",authenticate.data.verifyToken,controller.data.SendChats)


exports.route = {ChatRouter};