// models/User.js
const db = require('../config/db');

module.exports = {
  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows;
  },
  
  createUser: async (userData) => {
    const { username, email, password, role } = userData;
    const [result] = await db.query(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, password, role]
    );
    return result;
  }
};

