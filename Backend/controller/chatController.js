const client = require("../db.js");
const jwt = require("jsonwebtoken");
const {io} = require('../index.js')
require("dotenv").config();


// verification of usertoken send with socket headers
io.use((socket, next) => {
  const token = socket.handshake.auth?.token; 
  if (!token) {
    return next(new Error("Authentication error: Token missing"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
     console.log("error while verification")
      return next(new Error("Authentication error: Invalid token"));
    }
    socket.user = decoded; 
    next();
  });
});

// client sends a connection event and we recieve it
io.on("connection", (socket) => {
  const user1 = socket.user.id;
  const user1name = socket.user.name;
  let roomName ;

  socket.on("joinChat", (user2) => {
     const user2name = user2.selectedUser.name;
    roomName = `${user1name}_and_${user2name}'s personal space`; 

    if (!user2) {
      console.log("User2 not found");
      return socket.disconnect();
    }

    socket.join(roomName);
    io.to(roomName).emit("roomJoined", {roomName,user1,user2:user2.selectedUser.id});
  });
  socket.on("message", (data) => {
    if (!socket.roomName) {
      console.log("User not in a room");
      return;
    }
    io.to(socket.roomName).emit("newMessage", { sender: user1name, text: data });
  });
});




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

      const Search = `SELECT u.name,u.id,u.images,u.gender
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