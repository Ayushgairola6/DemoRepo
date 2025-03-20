const {client } = require("../db.js");
const jwt = require("jsonwebtoken");
const { io } = require("../index.js");
require("dotenv").config();

// verification of user token sent with socket headers
io.use((socket, next) => {
  const token = socket.handshake.headers.cookie;
  const verification = token.split("=")[1]
  if (!token || !verification) {
    return next(new Error("Authentication error: Token missing"));
  }

  jwt.verify(verification, process.env.JWT_SECRET, (err, decoded) => {
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
  if (!socket.user || !socket.user.id || !socket.user.name) {
    console.log("Invalid socket user data");
    return socket.disconnect(true);
  }

  const user1 = socket.user.id;
  const user1name = socket.user.name;

  socket.on("joinChat", (user2) => {
    if (!user2 || !user2.selectedUser?.id || !user2.selectedUser?.name) {
      console.log("User2 not found or invalid");
      return socket.disconnect(true);
    }

    const user2name = user2.selectedUser.name;
    const user2id = user2.selectedUser.id;

    // Ensure consistent room naming (sorted user IDs)
    const sortedIds = [user1, user2id].sort().join("_");
    const roomName = `chat_${sortedIds}`;
    
    socket.join(roomName);
    io.to(roomName).emit("roomJoined", { roomName, user1, user2: user2id });
  });

  socket.on("message", async (data) => {
    try {

      if (!data.message || !data.user1 || !data.user2) {
        console.log("Invalid message data");
        return;
      }
//  if any data is missing
if (!data || !data.message || !data.user1 || !data.user2) {
  console.log(" Invalid message data:", data);
  return;
}
      const { message, user1, user2, sender_name } = data;
      // if both sender and reciver are same return with error
      if (user1 === user2) {
        console.log(" Sender and Receiver cannot be the same!");
        return;
    }

    // if ids are not an integer
    if (typeof user1 !== "number" || typeof user2 !== "number") {
      console.log(" Invalid user IDs. Expected numbers, got:", { user1, user2 });
      return;
  }
// if message is empty
  if (message.trim() === "") {
    console.log("Empty message detected. Ignoring...");
    return;
}
      // Recalculate room name to avoid undefined room issues
      const sortedIds = [user1, user2].sort().join("_");
      const roomName = `chat_${sortedIds}`;
      // Ensure sender & receiver IDs are always in order
      const sender_id = user1;
      const receiver_id = user2;

      if (!sender_id || !receiver_id) {
        console.log("Sender or receiver ID not found");
        return;
      }

       //  Use a Pooled Client Directly (No `connect()`)
    const insertQuery = `
    INSERT INTO messages (roomName, message, sender_id, receiver_id) 
    VALUES ($1, $2, $3, $4) RETURNING *;
  `;

  //  intiated a new connection 
  client.query("BEGIN", (err) => {
    if (err) {
      console.error("Transaction Begin Error:", err);
      return;
    }
  
    client.query(insertQuery, [roomName, message, sender_id, receiver_id], (err, insertResponse) => {
      if (err) {
        console.error("DB Insert Error:", err);
        client.query("ROLLBACK", (rollbackErr) => {
          if (rollbackErr) console.error("Rollback Error:", rollbackErr);
        });
        return;
      }
  
      if (insertResponse.rowCount > 0) {
        io.to(roomName).emit("newMessage", {
          sender_id,
          receiver_id,
          message,
          sender_name,
        });
      }
  
      client.query("COMMIT", (commitErr) => {
        if (commitErr) console.error("Commit Error:", commitErr);
      });
    });
  });
  
    } catch (error) {
      console.error("General socket error:", error);
    }
  });
});




// function to send all matches user has matched with
const SendMatches = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "Error! Please try again later" });
    }

    const Search = `
      SELECT u.name, u.id, u.images, u.gender
      FROM matches m
      JOIN users u 
      ON (u.id = m.user1_id OR u.id = m.user2_id) 
      WHERE (m.user1_id = $1 OR m.user2_id = $1)
      AND u.id <> $1;
    `;

    client.query(Search, [userId], (err, result) => {
      if (err) {
        console.error("Error fetching matches:", err);
        return res.status(500).json({ message: "Server error" });
      }
      return res.status(200).json(result.rows.length > 0 ? result.rows : { message: "No match found yet" });
    });

  } catch (error) {
    console.error(" Error fetching matches:", error);
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

    const query = `
      SELECT 
        m.message, 
        m.sender_id, 
        s.name AS sender_name, 
        m.receiver_id, 
        r.name AS receiver_name 
      FROM messages m
      JOIN users s ON m.sender_id = s.id
      JOIN users r ON m.receiver_id = r.id
      WHERE m.roomName = $1
      ORDER BY m.timestamp DESC
      LIMIT 20;
    `;

    client.query(query, [roomName], (err, result) => {
      if (err) {
        console.error(" Error fetching matches:", err);
        return res.status(500).json({ message: "Server error" });
      }
      return res.status(200).json(result.rows.length > 0 ? result.rows.reverse() : { messages: "No messages yet" });
    });


  } catch (error) {
    console.error(" Error fetching chats:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.data = { SendMatches, SendChats };
