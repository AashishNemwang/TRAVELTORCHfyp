// test-db.js
const db = require('./config/db');

async function testDB() {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS solution');
    console.log('Database test successful:', rows);
  } catch (err) {
    console.error('Database test failed:', err);
  }
}

testDB();