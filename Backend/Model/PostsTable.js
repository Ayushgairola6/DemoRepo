const client = require("../db.js");

const createPostsTable = async () => {
    try {
        const query = `CREATE TABLE IF NOT EXISTS posts( id SERIAL PRIMARY KEY,
        mediaUrl TEXT NOT NULL,
        user_id INT NOT NULL,
        title VARCHAR(500) NOT NULL,
        caption TEXT NOT NULL,
        hashtag VARCHAR(500),
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )`
        if(client){const data = await client.query(query);
        console.log("Posts table has been created");}
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = {createPostsTable}