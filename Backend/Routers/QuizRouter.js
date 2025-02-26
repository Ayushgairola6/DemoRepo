const express = require('express');
const quizRouter = express.Router();
const controller = require("../controller/QuizController");



quizRouter.get("/quiz/queries",controller.data.GetQuizQuestions)
.post('/quiz/response',controller.data.GetQuizResult);


module.exports = {quizRouter}