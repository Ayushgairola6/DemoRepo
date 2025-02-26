const client = require("../db.js");

const CreatePreferenceTable = async ()=>{

   const query = `CREATE TABLE IF NOT EXISTS preferences (
      id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id), -- assuming there's a users table with id as a primary key
    country VARCHAR(100),
    state VARCHAR(100),
    city VARCHAR(100),
    age INT,
    relationship_goal VARCHAR(200),
    hobbies TEXT[], -- array of text
    interests TEXT[], -- array of text
    gender VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
 


   )`

  await client.query(query);
  console.log("preferences table created");
}

exports.table = {CreatePreferenceTable};