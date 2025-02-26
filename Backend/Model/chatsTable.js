const client = require("../db.js");

const createChatsTable = async ()=>{
	try{
      const query = `CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    chatroom_id VARCHAR(800),
    sender_id INT REFERENCES users(id) ON DELETE CASCADE,
    receiver_id INT REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`
 await client.query(query);
 console.log('Chats table has been created')

	}catch(error){
		throw error;
	}
}

createChatsTable()