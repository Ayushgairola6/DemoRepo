const client = require("../db.js");
const jwt = require("jsonwebtoken");
const { io } = require("../index.js");
require("dotenv").config();

// verification of user token sent with socket headers
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) {
    return next(new Error("Authentication error: Token missing"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Error while verification");
      return next(new Error("Authentication error: Invalid token"));
    }
    socket.user = decoded;
    next();
  });
});

// client sends a connection event and we receive it
io.on("connection", (socket) => {
  const user1 = socket.user.id;
  const user1name = socket.user.name;
  let roomName;

  socket.on("joinChat", (user2) => {
    if (!user2 || !user2.selectedUser) {
      console.log("User2 not found");
      return socket.disconnect();
    }
    
    const user2name = user2.selectedUser.name;
    const sortedIds = [user1, user2.selectedUser.id].sort().join("_");
      roomName = `chat_${sortedIds}`;


    socket.join(roomName);
    io.to(roomName).emit("roomJoined", { roomName, user1, user2: user2.selectedUser.id });
  });

  socket.on("message", async (data) => {
    if (!data.roomName) {
      console.log("User not in a room");
      return;
    }

    const { roomName, message, user1, user2 } = data;

    try {
      // Fetch the latest message in this room to check if the room exists
      const lastMessageQuery = `
        SELECT sender_id, receiver_id 
        FROM messages 
        WHERE roomName = $1 
        ORDER BY timestamp DESC 
        LIMIT 1
      `;
      const lastMessageResult = await client.query(lastMessageQuery, [roomName]);

      let sender_id = user1;
      let receiver_id = user2;

      if (lastMessageResult.rows.length > 0) {
        // Room exists, check last sender and receiver
        const lastSender = lastMessageResult.rows[0].sender_id;
        const lastReceiver = lastMessageResult.rows[0].receiver_id;

        if (user1 === lastSender) {
          sender_id = user2;
          receiver_id = user1;
        }
      }

      // Insert the new message
      const InsertQuery = `
        INSERT INTO messages (roomName, message, sender_id, receiver_id) 
        VALUES ($1, $2, $3, $4)
      `;
      const insertResponse = await client.query(InsertQuery, [roomName, message, sender_id, receiver_id]);

      if (insertResponse.rowCount > 0) {
        io.to(roomName).emit("newMessage", { sender_id,receiver_id, message: message });
      }
    } catch (error) {
      console.error("Error handling message:", error);
    }
  });
});

// function to send all matches user has matched with
const SendMatches = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(400).json({ message: "Error Unauthorized" });

    let userId;
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      userId = verified.id;
    } catch (error) {
      throw error;
    }

    if (!userId) return res.status(400).json({ message: "Error! Please try again later" });

    // Search for user in matches table and send the matched users profile data
    const Search = `
      SELECT u.name, u.id, u.images, u.gender
      FROM matches m
      JOIN users u 
      ON (u.id = m.user1_id OR u.id = m.user2_id) 
      WHERE (m.user1_id = $1 OR m.user2_id = $1)
      AND u.id <> $1;
    `;

    const data = await client.query(Search, [userId]);

    // If there are any matches, send them to the user
    if (data.rows.length > 0) {
      return res.status(200).json(data.rows);
    }

    return res.status(200).json({ message: "No match found yet" });
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// function to send all chats in a room
const SendChats = async (req, res) => {
  try {
    const roomName = req.params.roomName;

    if (!roomName) {
      return res.status(400).json({ message: "No room name found" });
    }

    const query = `SELECT 
    m.message, 
    m.sender_id, 
    s.name AS sender_name, 
    m.receiver_id, 
    r.name AS receiver_name 
FROM messages m
JOIN users s ON m.sender_id = s.id
JOIN users r ON m.receiver_id = r.id
WHERE m.roomName = $1;


`;
    const response = await client.query(query, [roomName]);

    if (response.rows.length === 0) {
      return res.status(200).json({ messages: "No messages yet" });
    }

    return res.status(200).json(response.rows);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.data = { SendMatches, SendChats };
