const express = require("express");
const PostRouter = express.Router();
const controller = require("../controller/PostController");
const {verifyToken} = require("../index.js")
const controller2 = require("../controller/usercontroller.js")

PostRouter.post("/create/post/",verifyToken,controller2.data.upload.single("media"),controller.data.CreatePost)
.get("/get/posts/all/",verifyToken,controller.data.SendPosts);

module.exports ={PostRouter};