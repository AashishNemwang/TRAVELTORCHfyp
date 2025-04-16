const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/admin/users', isAdmin, async (req, res) => {
  try {
    const [users] = await db.query(`
      SELECT id, username, email, role 
      FROM users
    `);
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

