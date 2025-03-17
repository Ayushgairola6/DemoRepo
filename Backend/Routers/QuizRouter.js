const express = require('express');
const quizRouter = express.Router();
const controller = require("../controller/QuizController");
const {verifyToken} = require("../index.js")



quizRouter.get("/quiz/queries",verifyToken,controller.data.GetQuizQuestions)
.post('/quiz/response',verifyToken,controller.data.GetQuizResult);


module.exports = {quizRouter}