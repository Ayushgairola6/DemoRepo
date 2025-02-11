const {Client } = require("pg");
require("dotenv").config();

// create a new local client
const client = new Client({
	user:process.env.USER,
	host:process.env.HOST,
	database:process.env.DTB,
	password:process.env.PASS,
	port:process.env.PORT,
	ssl: {
    rejectUnauthorized: false
  }
})


// connect to the database
client.connect()
.then(()=>console.log("Connected to the database"))
.catch(err=>console.error(err.stack))



module.exports = client;
