const client = require("../db.js")


const CreateLikeTable = async ()=>{

const query = 	`CREATE TABLE IF NOT EXISTS likes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,  -- User who likes
    liked_user_id INT NOT NULL,  -- User who is liked
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, liked_user_id),  -- Prevent duplicate likes
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (liked_user_id) REFERENCES users(id) ON DELETE CASCADE
);
`
 await client.query(query);
 console.log("LikeTable has been created");

}


exports.table = {CreateLikeTable};