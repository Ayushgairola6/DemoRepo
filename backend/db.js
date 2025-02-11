const {Client } = require("pg");
require("dotenv").config();

// create a new local client
const client = new Client({
	user:process.env.dbuser,
	host:process.env.dbhost,
	database:process.env.dbdatabase,
	password:process.env.dbpassword,
	port:process.env.dbport,
	ssl: {
    rejectUnauthorized: false
  }
})


// connect to the database
client.connect()
.then(()=>console.log("Connected to the database"))
.catch(err=>console.error(err.stack))



module.exports = client;