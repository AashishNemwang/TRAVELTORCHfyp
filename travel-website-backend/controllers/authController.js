const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const authController = {
  async signup(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, confirmPassword, agencyName, role } = req.body;
    try {
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords don't match" });
      }

      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const userId = await User.createUser({ username, email, password, role });

      if (role === 'agency') {
        if (!agencyName) {
          return res.status(400).json({ message: "Agency name is required" });
        }
        await User.createAgency(userId, agencyName);
      }

      res.status(200).json({ message: "User registered successfully", userId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error during registration" });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findByEmail(email);
      console.log("Fetched user:", user);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Create JWT token with 7 days expiration
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Set cookie with options
      res.cookie('token', token, {
        httpOnly: true,
        secure: false, // set true in production (HTTPS)
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
      });

      return res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      if (!res.headersSent) {
        return res.status(500).json({ message: "Server error during login" });
      } else {
        console.error("Error occurred after headers sent:", error.message);
      }
    }
  },

  async logout(req, res) {
    try {
      await res.clearCookie('token');
      return res.status(200).json({ message: "Logout successfully." });
    } catch (error) {
      return res.status(500).json({ message: 'Error on logout.' });
    }
  }
};

module.exports = authController;
