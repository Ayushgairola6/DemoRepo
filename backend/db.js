const {Client } = require("pg");


// create a new local client
const client = new Client({
	user:"postgres",
	host:"localhost",
	database:"Test",
	password:"Ayush@2002",
	port:5432
})


// connect to the database
client.connect()
.then(()=>console.log("Connected to the database"))
.catch(err=>console.error(err.stack))



module.exports = client;