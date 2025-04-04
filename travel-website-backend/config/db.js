// config/db.js
const { createPool } = require("mysql2/promise");
require("dotenv").config();

const pool = createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "traveltorch",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
pool.getConnection()
  .then((conn) => {
    console.log("✅ Connected to MySQL database");
    conn.release();
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  });

module.exports = pool;