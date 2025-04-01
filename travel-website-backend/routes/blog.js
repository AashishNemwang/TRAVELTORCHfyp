const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authenticateUser = require("../middleware/authMiddleware");

// Middleware to check if user is Admin
const checkAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

// Get All Blogs
router.get("/", async (req, res) => {
  try {
    const [blogs] = await db.query("SELECT * FROM blogs ORDER BY created_at DESC");
    res.json(blogs);
  } catch (error) {
    console.error("Fetch Blogs Error:", error);
    res.status(500).json({ error: "Error fetching blogs" });
  }
});

// Add a Blog (Admin Only)
router.post("/", authenticateUser, checkAdmin, async (req, res) => {
  const { title, description, image_url } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  try {
    await db.query("INSERT INTO blogs (title, description, image_url) VALUES (?, ?, ?)", 
      [title, description, image_url]
    );
    res.json({ message: "Blog added successfully" });
  } catch (error) {
    console.error("Add Blog Error:", error);
    res.status(500).json({ error: "Error adding blog" });
  }
});

// Delete a Blog (Admin Only)
router.delete("/:id", authenticateUser, checkAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM blogs WHERE id = ?", [id]);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    res.status(500).json({ error: "Error deleting blog" });
  }
});

module.exports = router;
