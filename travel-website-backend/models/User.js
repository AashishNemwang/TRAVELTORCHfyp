const db = require("../config/db");

const User = {
  createUser: (user, callback) => {
    const { username, email, password, role } = user;
    const sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(sql, [username, email, password, role], callback);
  },

  findByEmail: (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], callback);
  }
};

module.exports = User;
