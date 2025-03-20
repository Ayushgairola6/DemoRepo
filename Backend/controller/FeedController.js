const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv")
dotenv.config();
const jwt_Secret = process.env.JWT_SECRET;
const {client} = require("../db.js")

		// function that'll send users profiles based on his preference or 
		// randomly until he sets some filters

	 
// Send All Profiles to the user as recommendations

const SendProfiles = async (req,res)=>{
    try{
      console.log(req.user)
        

          const userId =req.user.id;
       

         if(!userId){
            return res.status(400).json("error no user id found");
         }

         const checkGender = `SELECT * FROM users WHERE id = $1`;
         const User_gender = await client.query(checkGender,[userId]);
         const gender =User_gender.rows[0].gender;
        
         if(User_gender.rows.length===0 || !gender){
            return res.status(200).json({message:"Please update you profile first"})
         }

        //Fetch 30 users at a time and set a random offset to make the profiles random
        const SearchQuery = `SELECT u.id ,u.name , u.gender ,u.age,u.images ,u.about, p.interests,p.hobbies,p.city,p.state,p.country FROM users u  JOIN 
        preferences p ON u.id = p.user_id 
        WHERE u.id != $1 AND u.gender != $2
        LIMIT 20;

        `

        // const SearchQuery = `SELECT * FROM users LIMIT 20`
        const data = await client.query(SearchQuery,[req.user.id,gender]);
        
        if(data.rows.length===0){
            return res.status(400).json({message:"No matches found"})
        }
       return res.status(200).json(data.rows);


    }catch(error){
        throw error;
    }
}



// find profles based on the search filters

    const Get_Profiles = async (req, res) => {
    try {
      console.log(req.user)
        
       // get the preferences
        const {country,state,city,age,relationship_goal,hobbies,interests,gender} = req.body;

        if (!country || !state || !city || !age || !relationship_goal || !hobbies || !interests || !gender) {
            console.log("all fields are mandatory")
    return res.status(400).json({ message: "Missing required fields" });
}

        

        // Verify JWT Token
        const User_Id = req.user.id ;

    
        
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
    u.name,
    u.images,
    p.country,
    p.state,
    p.city,
    u.age,
    p.relationship_goal,
    p.hobbies,
    p.interests,
    u.gender
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
 

// function to capture likes 


const HandleLikes = async (req, res) => {
    try {
        const user2Id = req.params.id; // Fixed `req.param.id`
        if (!user2Id) {
            return res.status(400).json({ error: "No user found" });
        }

      
       
        // Verify token and extract user ID
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ error: "No user ID found" });
        }

        // Insert the like into the `likes` table
        const insertQuery = `
            INSERT INTO likes (user_id, liked_user_id) 
            VALUES ($1, $2) 
            ON CONFLICT DO NOTHING;
        `;
        await client.query(insertQuery, [userId, user2Id]);

        // Check if a match exists
        const checkMatchQuery = `
            SELECT * FROM likes 
            WHERE (user_id = $1 AND liked_user_id = $2) 
            OR (user_id = $2 AND liked_user_id = $1);
        `;
        const check = await client.query(checkMatchQuery, [userId, user2Id]);

        if (check.rowCount === 2) { // Both users have liked each other
            const insertMatchQuery = `
                INSERT INTO matches (user1_id, user2_id) 
                VALUES ($1, $2) 
                ON CONFLICT DO NOTHING;
            `;
            const ItsAmatch = await client.query(insertMatchQuery, [userId, user2Id]);
             
            return res.status(200).json({ message: "It's a match!" });
        }

        return res.status(200).json({ message: "Liked successfully" });

    } catch (err) {
        console.error("Error handling like:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};





exports.data = { Get_Profiles ,SendProfiles,HandleLikes};


  