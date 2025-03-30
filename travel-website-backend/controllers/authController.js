const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const dotenv = require("dotenv");

dotenv.config();

exports.register = (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  User.findByEmail(email, (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ message: "Error hashing password" });

      User.createUser({ username, email, password: hash, role }, (err) => {
        if (err) return res.status(500).json({ message: "Database not WORKING" });

        res.status(201).json({ message: "User registered successfully" });
      });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
    });
  });
};
