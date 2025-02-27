const client = require("../db.js");

const createQuizQuestionTable = async()=>{
	const query = `CREATE TABLE IF NOT EXISTS quizquestions (
     id SERIAL PRIMARY KEY,
     category VARCHAR(800) NOT NULL,
     question TEXT NOT NULL

	)`

	await client.query(query);

	console.log("quizquestions table created")
}



const createOptionsTable = async()=>{
	const query = `CREATE TABLE IF NOT EXISTS quizoptions(
    id SERIAL PRIMARY KEY,
    category VARCHAR(800) NOT NULL,
    option TEXT NOT NULL,
    option_serial VARCHAR(10)
    question_id INT REFERENCES quizquestions(id) ON DELETE CASCADE
  
	)`

	await client.query(query);
	console.log('quizoptions table has been created');
}

const createQuizResponseTable =async()=>{
	const query = `CREATE TABLE IF NOT EXISTS quiz_response(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      question_id INT REFERENCES quizquestions(id) ON DELETE CASCADE,
      answer_id INT REFERENCES quizoptions(id) ON DELETE CASCADE

	)`

	await client.query(query);
	console.log("quiz_response table has been created");

	const date = await client.query(`SELECT * FROM quiz_response`)
}
createQuizQuestionTable()
createOptionsTable()
createQuizResponseTable()