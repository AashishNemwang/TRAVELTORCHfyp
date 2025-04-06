const db = require('../config/db');

module.exports = {
  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows;
  },
  
  createUser: async (userData) => {
    const { username, email, password, role = 'traveler' } = userData;
    const validRoles = ['traveler', 'agency', 'admin'];
    
    if (!validRoles.includes(role)) {
      throw new Error('Invalid user role specified');
    }

    const [result] = await db.query(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, password, role]
    );
    return result;
  }
};

