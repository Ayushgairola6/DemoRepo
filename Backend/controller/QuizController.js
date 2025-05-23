const jwt = require("jsonwebtoken");
const jwt_Secret = process.env.JWT_SECRET;

const { client } = require("../db.js")


// sending quizquestions with category and their respective answers from the db
const GetQuizQuestions = async (req, res) => {
  try {
    const query = `SELECT 
    q.id AS question_id,
    q.category,
    q.question,
    json_agg(json_build_object(
        'option_id', o.id, 
        'option', o.option, 
        'option_serial', o.option_serial
    )) AS options
FROM quizquestions q
JOIN quizoptions o ON q.id = o.question_id
GROUP BY q.id, q.category, q.question 
ORDER BY MIN(q.id)`;

    const data = await client.query(query);
    if (data.rows.length === 0) {
      return res.status(200).json([]);
    } else {
      return res.status(200).json(data.rows);

    }

  } catch (error) {
    throw error;
  }
}



// send quiz results based on the quiz answers 
const GetQuizResult = async (req, res) => {
  try {

    const UserId = req.user.id;
    if (!UserId) return res.status(400).json({ message: "Error please try again later!" })


    // sending both answer and question id with parameters in headers;
    const response = req.body;

    // check if response is an array if not return
    if (!Array.isArray(response) || response.length === 0) {
      return res.status(400).json({ message: "No response array  found" })
    }

    // Filter out empty objects or invalid entries if there is an
    const validResponses = response.filter(
      (entry) => entry.question_id && entry.option_id
    );

    // if there are 0 validResponses return with an error;
    if (validResponses.length === 0) {
      return res.status(400).json({ message: "No valid responses found" });
    }

    // returning only question_ids and option_id
    const questionIds = validResponses.map(e => e.question_id);
    const answerIds = validResponses.map(e => e.option_id);


    if (questionIds.length === 0 || answerIds.length === 0) {
      console.log("No valid question IDs to check.");
      return res.status(400).json({ message: "No valid question IDs found." });
    }



    const InsertQuery = `
      INSERT INTO quiz_response (user_id, question_id, answer_id)
      SELECT $1, UNNEST($2::int[]), UNNEST($3::int[])
      ON CONFLICT (user_id, question_id) 
      DO UPDATE SET answer_id = EXCLUDED.answer_id;
    `;

    const result = await client.query(InsertQuery, [UserId, questionIds, answerIds]);

    if (result.rowCount === 0) {
      return res.status(400).json({ message: "Error updating responses" });
    }
    const users = await SendUsers(validResponses, UserId, questionIds, answerIds)

    if (!users) {
      return res.status(200).json({ message: "Your thoughts are unique you just need to wait to find the right person" })
    }
    return res.status(200).json(users);

  } catch (err) {
    throw err;
  }
}


// function to get users whose answer matches users answerIds


const SendUsers = async (validResponses, UserId, questionIds, answerIds) => {
  try {
    const questionAnswerPairs = validResponses.map(r => `(${r.question_id}, ${r.option_id})`).join(", ");
    const totalQuestions = validResponses.length;

    if (!questionAnswerPairs) {
      return res.status(400).json({ message: "Error while getting matches please try again later" })
    }

    const secondquery = ` WITH user_answers AS (
        SELECT q.question_id, a.answer_id
        FROM UNNEST($1::int[]) WITH ORDINALITY AS q(question_id, ord)
        JOIN UNNEST($2::int[]) WITH ORDINALITY AS a(answer_id, ord)
          ON q.ord = a.ord
      ),
      matched_users AS (
        SELECT qr.user_id, COUNT(*) AS matched_count
        FROM quiz_response qr
        JOIN user_answers ua 
          ON qr.question_id = ua.question_id 
         AND qr.answer_id = ua.answer_id
        WHERE qr.user_id != $3
        GROUP BY qr.user_id
        HAVING COUNT(*) > 0
      )
      SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.age, 
        u.gender, 
        u.about, 
        u.location, 
        u.images,
        p.country, 
        p.state, 
        p.city, 
        p.relationship_goal, 
        p.hobbies, 
        p.interests,
        FLOOR((mu.matched_count::decimal / $4) * 10) AS match_score
      FROM matched_users mu
      JOIN users u ON mu.user_id = u.id
      JOIN preferences p ON u.id = p.user_id
      ORDER BY match_score DESC;    `;

    const accounts = await client.query(secondquery, [questionIds, answerIds, UserId, totalQuestions]);
    return accounts.rows;

 
  } catch (error) {
    throw error
  }
}


exports.data = { GetQuizResult, GetQuizQuestions };