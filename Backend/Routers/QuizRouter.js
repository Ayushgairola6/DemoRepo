const express = require('express');
const quizRouter = express.Router();
const controller = require("../controller/QuizController");
const authenticate = require("../controller/userController.js")



quizRouter.get("/quiz/queries",authenticate.data.verifyToken,controller.data.GetQuizQuestions)
.post('/quiz/response',authenticate.data.verifyToken,controller.data.GetQuizResult);


module.exports = {quizRouter}