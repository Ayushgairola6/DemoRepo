const client = require("../db.js");

const createMediaTable = async()=>{

  const query = `CREATE TABLE media (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
 `;

  await client.query(query);
  console.log("media table created");
}

module.exports = {createMediaTable};