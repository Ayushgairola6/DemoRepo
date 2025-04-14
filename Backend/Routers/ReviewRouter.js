const controller = require("../controller/ReviewController.js");
const express = require("express");
const ReviewRouter = express.Router();
const {verifyToken} = require("../index.js")


ReviewRouter.post("/review/data",verifyToken,controller.data.RecieveReviews)
ReviewRouter.get("/reviews/get/all",controller.data.SendReviews)

exports.route ={ReviewRouter};