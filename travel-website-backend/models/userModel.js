const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  async createUser({ username, email, password, role }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, role]
    );
    return result.insertId;
  },

  async createAgency(userId, agencyName) {
    const [result] = await pool.execute(
      'INSERT INTO agencies (user_id, agency_name) VALUES (?, ?)',
      [userId, agencyName]
    );
    return result;
  },

  async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = User;