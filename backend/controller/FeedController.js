const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwt_Secret = 12345;
const client = require("../db.js")

		// function that'll send users profiles based on his preference or 
		// randomly until he sets some filters

	 

    const Get_Profiles = async (req, res) => {
    try {
       // get the preferences
        const {country,state,city,age,relationship_goal,hobbies,interests,gender} = req.body;

        if (!country || !state || !city || !age || !relationship_goal || !hobbies || !interests || !gender) {
    return res.status(400).json({ message: "Missing required fields" });
}

        const UserToken = req.headers.authorization.split(" ")[1];
        if (!UserToken) {
            return res.status(400).json({ message: "No token provided" });
        }
      // console.log(req.body);
        const jwtSecret = process.env.JWT_SECRET || "12345"; // Use env variable for the secret key

        // Verify JWT Token
        let User_Id ;

        const decoded = jwt.verify(UserToken, jwt_Secret ,(error,resukt)=>{
            if(error){
                return res.status(400).json("token expired || token error")
            }
         User_Id = decoded.id;

        });
        
        //Insert  User prference if not exists from the database if exists update them
const SearchQuery = `SELECT * FROM preferences WHERE user_id = $1`
        const result = await client.query(SearchQuery,[User_Id])
  
         if(result.rows.length>0){
            const UpdateQuery = `UPDATE preferences 
                         SET country = $1, 
                             state = $2, 
                             city = $3, 
                             age = $4, 
                             relationship_goal = $5, 
                             hobbies = $6, 
                             interests = $7, 
                             gender = $8
                         WHERE user_id = $9`;
            const data = await client.query(UpdateQuery,[country,state,city,age,relationship_goal,hobbies,interests,gender,User_Id])

            if(!data || !data.rows){
                console.log("error while updating user preferences")
                return res.status(400).json({message:"Error while updating your data"});
            }
         }
       
          else{
            const insertQuery = ` INSERT INTO preferences (user_id, country, state, city, age, relationship_goal, hobbies, interests, gender) 
                         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
            const data= await client.query(insertQuery,[User_Id, country, state, city, age, relationship_goal, hobbies, interests, gender])

            if(!data || !data.rows){
                console.log("Error while inserting data in the db")
                return res.status(400).json({message:"Error while inserting your data"})
            }
          }
    
  
    

// mactch score based on the input match
let offset = 0;
   const GetUsers = `SELECT 
    u.id AS user_id,
    u.username,
    u.email,
    u.images,
    p.country,
    p.state,
    p.city,
    p.age,
    p.relationship_goal,
    p.hobbies,
    p.interests,
    p.gender
FROM 
    users u
LEFT JOIN 
    preferences p ON u.id = p.user_id
WHERE 
    u.id != $1 -- Exclude the current user by their ID
ORDER BY 
    u.id ASC -- Or any other column, based on how you want to order the results
LIMIT 30
OFFSET $2;
 `;
const  limit = 50 ;

const users = await client.query(GetUsers,[User_Id, offset])

if(users.rowCount === 0){

 throw new Error("No users found in the db")
}
// CalculateCompatibilityScore
const profilesWithMatchScore = CalculateCompatibilityScore(users.rows,req.body);

   offset += limit;
   // console.log(profilesWithMatchScore)
        return res.status(200).json(profilesWithMatchScore);
    } catch (error) {
        console.error(error);
       
    }
};


function CalculateCompatibilityScore(users,input){

     const maxScore = 10;

  // Calculate match score for each user with
  // used map method as it return a new array itself without modifying the original one
  const profilesWithScores = users.map((user) => {
    let score = 0;

    // Criteria 1: Country match
    if (user.country === input.country) score++;

    // Criteria 2: State match
    if (user.state === input.state) score++;

    // Criteria 3: City match
    if (user.city === input.city) score++;

    // Criteria 4: Age match (allow a range of 5 years)
    if (user.age >= input.age - 5 && user.age <= input.age + 5) score++;

    // Criteria 5: Relationship goal match
    if (user.relationship_goal === input.relationship_goal) score++;

    // Criteria 6: Hobbies match (using arrays)
   if ((user.hobbies || []).some(hobby => (input.hobbies || []).includes(hobby))) {
  score++;
}

    // Criteria 7: Interests match (using arrays)
    if ((user.interests || []).some(interest => (input.interests || []).includes(interest))) {
  score++;
}

    // Criteria 8: Gender match
    if (user.gender === input.gender) score++;

    // Normalize score out of 10
    const matchScore = (score / maxScore) * 10;

    // Return user with matchScore
    return { ...user, matchScore };
  });

  // Sort profiles by match score (descending)
  profilesWithScores.sort((a, b) => b.matchScore - a.matchScore);

  // Return the sorted profiles with match scores
  return profilesWithScores;
  } 
 




exports.data = { Get_Profiles };


  