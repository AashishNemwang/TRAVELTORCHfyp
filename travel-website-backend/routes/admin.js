const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all users with role traveler
router.get('/travelers', async (req, res) => {
  const [rows] = await db.query("SELECT * FROM users WHERE role = 'traveler'");
  res.json(rows);
});

// Get all users with role agency
router.get('/agencies', async (req, res) => {
  const [rows] = await db.query("SELECT * FROM users WHERE role = 'agency'");
  res.json(rows);
});

// Get all travel packages
router.get('/packages', async (req, res) => {
  const [rows] = await db.query("SELECT * FROM travel_package");
  res.json(rows);
});

// Get all reviews
router.get('/reviews', async (req, res) => {
  const [rows] = await db.query("SELECT * FROM reviews");
  res.json(rows);
});

// Get all blogs
router.get('/blogs', async (req, res) => {
  const [rows] = await db.query("SELECT * FROM blogs");
  res.json(rows);
});

// Add a blog
router.post('/blogs', async (req, res) => {
  const { title, content, image } = req.body;
  const [result] = await db.query(
    "INSERT INTO blogs (title, content, image, created_at) VALUES (?, ?, ?, NOW())",
    [title, content, image]
  );
  res.json({ id: result.insertId });
});

// Update a blog
router.put('/blogs/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, image } = req.body;
  await db.query(
    "UPDATE blogs SET title = ?, content = ?, image = ? WHERE id = ?",
    [title, content, image, id]
  );
  res.sendStatus(200);
});

// Delete a blog
router.delete('/blogs/:id', async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM blogs WHERE id = ?", [id]);
  res.sendStatus(200);
});

module.exports = router;
