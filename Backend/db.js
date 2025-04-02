const {Pool  } = require("pg");
require("dotenv").config();

// creating a pg pool so that it can handle promises on its own
const client = new Pool({
  connectionString: process.env.PG_URI,
  ssl: { rejectUnauthorized: false },
  max: 20, 
  // idleTimeoutMillis: 30000, 
  // connectionTimeoutMillis: 7000, 
});
// connect to the database
client
  .query("SELECT 1") 
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Database connection error:", err.stack));



module.exports = {client };