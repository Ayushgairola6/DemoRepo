const {Client } = require("pg");
require("dotenv").config();


// create a new local client
// const client = new Client({
// 	user:process.env.PG_USER,
// 	host:process.env.PG_HOST,
// 	database:process.env.PG_DTB,
// 	password:process.env.PG_PASS,
// 	port:process.env.PG_PORT,
// 	ssl: {
//     rejectUnauthorized: false
//   }
// })
// const client = new Client({
// 	user:"postgres",
// 	host:"localhost",
// 	database:"Test",
// 	password:"Ayush@2002",
// 	port:5432,
	
// })

const client = new Client({
  connectionString: process.env.PG_URI,ssl: {
    rejectUnauthorized: false
  }
});
// connect to the database
client.connect()
.then(()=>console.log("Connected to the database"))
.catch(err=>console.error(err.stack))



module.exports = client;