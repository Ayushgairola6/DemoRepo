const client = require('../db.js');

const createUsersTable = async(req,res)=>{
	 const query = ` CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
       name VARCHAR(500) NOT NULL,
       email VARCHAR(800) NOT NULL,
       hashed_password TEXT NOT NULL,
       age INT ,
       gender VARCHAR(500),
      about TEXT,
      location VARCHAR(800),
      images TEXT[]
)`
    await client.query(query)
	console.log("UsersTable has been created")
}

exports.data = {createUsersTable};