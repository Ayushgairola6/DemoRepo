const client = require("../db.js");


const creatematchTable = async ()=>{

	const query = `CREATE TABLE IF NOT EXISTS matches (
    id SERIAL PRIMARY KEY,
    user1_id INT NOT NULL,  
    user2_id INT NOT NULL,  
    matched_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user1_id, user2_id),  -- Ensure unique matches
    FOREIGN KEY (user1_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (user2_id) REFERENCES users(id) ON DELETE CASCADE
);
 `
 await client.query(query);
 console.log("match table has been created");

}

exports.table = {creatematchTable};