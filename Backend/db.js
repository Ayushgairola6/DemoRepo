const { Pool } = require("pg");
require("dotenv").config();

const client = new Pool({
  connectionString: process.env.PG_URI,
  ssl: { rejectUnauthorized: false },
  max: 10, // 10 is enough unless you're scaling
  idleTimeoutMillis: 30000, // free up unused connections after 30s
  connectionTimeoutMillis: 5000, // wait max 5s to get a connection
});

// Listen for errors on idle clients
client.on("error", (err) => {
  console.error("Unexpected idle client error:", err);
  // Optionally: notify you via email, log to monitoring, etc.
});

// Just for initial test
client
  .query("SELECT 1")
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Database connection error:", err.stack));

// Export the pool (not "client")
module.exports = { client };
