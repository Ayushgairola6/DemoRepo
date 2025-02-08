const jwt = require("jsonwebtoken");
const jwt_Secret = 12345;
const {client} = require("../db.js")


   // get quiz questions based on the category assuming there is category related to each quizz;
	const GetQuizQuestions= async (req,res)=>{
     try{
          // category for which the user wants to take a quiz about
          const category= req.params;
          if(!category){
          	return res.status(400).json({message:"Choose a category first"})
          }

          // search for the categories and quiz question related to it from the respective table
          // Assuming The quiz table can contain both questions and an array of answers related to it 
          const SearchQuery = ` SELECT * FROM quiz WHERE category = @1`;
          const response = await client.query(SearchQuery,[category]);
          // assuming it is an array
          const quizQuestions = response.rows;

         if(response.length===0 || !quizQuestions){
         	console.log("No quizz questions found");
         	return res.status(400).json({message:`No quiz found related to ${category}`});
         }

         return res.status(200).json(quizQuestions);


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
      const {QuizAnswer} = req.body;

     if(!QuizAnswer){
     	console.log(`error in input ${QuizAnswer}`);
     	return res.status(400).json({message:"No input found"});
     }

      const decoded = jwt.verify(userToken,jwt_Secret,(error,result)=>{
      	if(error){
      console.log(error);
      return res.status(400).json(error);
    }
   //result is the token
   // assumed result is an object
      UserId= result.id ;
      })
    // first insert the user quiz answers in the tables

      const InsertQuery = `INSERT INTO quizResponse (user_id ,response) VALUES (@1,@2)`;
      const result = await client.query(InsertQuery,[UserId,QuizAnswer]); 
      const data = result.rows;

      if(result.length === 0){
      	console.log("no data");
      	return res.status(400).json("no data found after inserting");
      }

      // find the users with same quizanswers as the current user
     const SearchQuery = `SELECT u.*,qr.* FROM users u 
	      INNER JOIN quizResponse qr
	      ON u.id = qr.user_id 
	      WHERE  QuizAnswer = @> `;
      const response = await client.query(SearchQuery,[QuizAnswer]);
      const users = response.rows;

      if(response.length===0 || !users){
      	console.log("")
      	return res.status(400).json("No users found with the same answers as you ");
      }
    return res.status(200).json(users);

     }catch(err){
     	throw err;
     }
	}


exports.data={GetQuizResult,GetQuizQuestions};