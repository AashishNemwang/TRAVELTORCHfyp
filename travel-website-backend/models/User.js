const pool = require('../config/db');

class User {
  static async create({ username, email, password, role, agencyName = null }) {
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password, role, agency_name) VALUES (?, ?, ?, ?, ?)',
      [username, email, password, role, agencyName]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, username, email, role, agency_name FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }
}

module.exports = User;