const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/authMiddleware");
const db = require("../config/db");

// ✅ Protect all admin routes
router.use(verifyAdmin);

// ✅ Admin Dashboard Overview
router.get("/dashboard", (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard!" });
});

// ✅ Get All Users
router.get("/users", (req, res) => {
  const query = "SELECT id, username, email, role FROM users";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching users" });
    res.json(results);
  });
});

// ✅ Delete User by ID
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ message: "Error deleting user" });
    res.json({ message: "User deleted successfully" });
  });
});

// ✅ Get All Blogs
router.get("/blogs", (req, res) => {
  const query = "SELECT * FROM blogs";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching blogs" });
    res.json(results);
  });
});

// ✅ Add a New Blog
router.post("/blogs", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = "INSERT INTO blogs (title, content) VALUES (?, ?)";
  db.query(query, [title, content], (err) => {
    if (err) return res.status(500).json({ message: "Error adding blog" });
    res.status(201).json({ message: "Blog added successfully" });
  });
});

// ✅ Update a Blog by ID
router.put("/blogs/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = "UPDATE blogs SET title = ?, content = ? WHERE id = ?";
  db.query(query, [title, content, id], (err) => {
    if (err) return res.status(500).json({ message: "Error updating blog" });
    res.json({ message: "Blog updated successfully" });
  });
});

// ✅ Delete a Blog by ID
router.delete("/blogs/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM blogs WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ message: "Error deleting blog" });
    res.json({ message: "Blog deleted successfully" });
  });
});

module.exports = router;
