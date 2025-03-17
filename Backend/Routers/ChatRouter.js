const controller = require("../controller/chatController");
const express = require("express");
const ChatRouter = express.Router();
const {verifyToken} = require("../index.js")

ChatRouter.get("/all/matches",verifyToken,controller.data.SendMatches)
ChatRouter.get("/all/Chats/:roomName",verifyToken,controller.data.SendChats)


exports.route = {ChatRouter};