const client = require("../db.js");
const jwt = require("jsonwebtoken");
const {Server} = require("socket.io");
require("dotenv").config();

// const io = new Server(server, {
//   cors: { origin: "*" }, 
// }); 

// // verification of usertoken
// io.use((socket, next) => {
//   const token = socket.handshake.auth?.token; 
//   if (!token) {
//     return next(new Error("Authentication error: Token missing"));
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return next(new Error("Authentication error: Invalid token"));
//     }
//     socket.user = decoded; 
//     next();
//   });
// });

// // Handling socket connections after authentication
// io.on("connection", (socket) => {
//   console.log("User connected:", socket.user.id);

//   socket.on("message", (data) => {
//     console.log(`Message from ${socket.user.id}:`, data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.user.id);
//   });
// });



// function to send all matches user has matched with 
const SendMatches =async(req,res)=>{
	try{
      const token = req.headers.authorization.split(' ')[1];

      if(!token) return res.status(400).json({message:"Error Unauthorized"});
      let userId;
      try{
      	const verified = jwt.verify(token,process.env.JWT_SECRET);
      	 userId = verified.id;
      }catch(error){
      	throw error;
      }

      if(!userId)return res.status(400).json({message:"Error! Please try again later"});

      // search for user in matches table and send the matched users profile data;

      const Search = `SELECT u.*
FROM matches m
JOIN users u 
ON (u.id = m.user1_id OR u.id = m.user2_id) 
WHERE (m.user1_id = $1 OR m.user2_id = $1)
AND u.id <> $1;
 `;
      const data = await client.query(Search,[userId])
      // if there are any matches send them to user
       if(data.rows.length>0){
       
        return res.status(200).json(data.rows);
       }
       return res.status(200).json({message:"No match found yet"})

	}catch(error){
		throw error;
	}
}

exports.data = {SendMatches}