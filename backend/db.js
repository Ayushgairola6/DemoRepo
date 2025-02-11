const {Client } = require("pg");
require("dotenv").config();

// create a new local client
const client = new Client({
	user:"avnadmin",
	host:"pg-337cfd91-ayushgairola2002-403c.f.aivencloud.com",
	database:"defaultdb",
	password:"AVNS_muwj0TXfFq0xeeXWBSB",
	port:14598,
	ssl: {
    rejectUnauthorized: false
  }
})


// connect to the database
client.connect()
.then(()=>console.log("Connected to the database"))
.catch(err=>console.error(err.stack))



module.exports = client;
