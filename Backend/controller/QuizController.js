const jwt = require("jsonwebtoken");
const jwt_Secret = process.env.JWT_SECRET;

const client = require("../db.js")


// sending quizquestions with category and their respective answers from the db
	const GetQuizQuestions= async (req,res)=>{
     try{
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
        if(data.rows.length===0){
         console.log("Error in getting quizdata")
         return res.status(400).json("Error");
        }


        return res.status(200).json(data.rows);


     }catch(error){
     	throw error;
     }
	}



	// send quiz results based on the quiz answers 
	const GetQuizResult = async (req,res)=>{
     try{
     	const userToken = req.headers.authorization.split(" ")[1];
     	if(!userToken){
     		return res.status(400).json("No token found");
     	}
    
   

     	let UserId;

      const verified = jwt.verify(userToken,jwt_Secret,(err,result)=>{
         if(err) throw new Error("Invalid userToken");

         UserId = result.id;
      })
      
      // sending both answer and question id with parameters in headers;
    const response = req.body;

// check if response is an array if not return
    if(!Array.isArray(response) || response.length === 0){
      return res.status(400).json({message:"No response array  found"})
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
const answerIds = validResponses.map(e=>e.option_id);


if (questionIds.length === 0 || answerIds.length===0) {
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
   const users = await SendUsers(validResponses,UserId)

   if(!users){
    return res.status(200).json({message:"Your thoughts are unique you just need to wait to find the right person"})
   }
   console.log(users)
    return res.status(200).json(users);

     }catch(err){
     	throw err;
     }
	}


// function to get users whose answer matches users answerIds


const SendUsers = async (validResponses,UserId)=>{
  try{
    const questionAnswerPairs = validResponses.map(r => `(${r.question_id}, ${r.option_id})`).join(", ");
    const totalQuestions = validResponses.length; 

     if(!questionAnswerPairs){
      return res.status(400).json({message:"Error while getting matches please try again later"})
     }

     const secondquery = `
       WITH matched_users AS (
        SELECT user_id
        FROM quiz_response
        WHERE (question_id, answer_id) IN (${questionAnswerPairs})
        GROUP BY user_id
        HAVING COUNT(*) = $1
    )
    SELECT u.id, u.name, u.email, u.age, u.gender, u.about, u.location, u.images,
           p.country, p.state, p.city, p.relationship_goal, p.hobbies, p.interests
    FROM users u
    JOIN preferences p ON u.id = p.user_id
    WHERE u.id IN (SELECT user_id FROM matched_users)
    AND u.id != $2;
    `;

    const accounts = await client.query(secondquery, [totalQuestions,UserId]);
    console.log(accounts.rows)
    return accounts.rows;

   const query = `SELECT u.username,u.images from users u LEFT JOIN quiz_response q ON q `
  }catch(error){
    throw error
  }
}


exports.data={GetQuizResult,GetQuizQuestions};