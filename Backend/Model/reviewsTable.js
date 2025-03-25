const client = require("../db.js")

const CreateReviewTable = async()=>{
    try {
        const query = `CREATE TABLE IF NOT EXISTS reviews (
         id SERIAL PRIMARY KEY,
         user_id INT NOT NULL,  
         text TEXT NOT NULL,
         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )`

        await client.query(query);
        console.log("ReviewTable has been created");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {CreateReviewTable};
