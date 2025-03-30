const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authenticateUser = require("../middleware/authMiddleware");

// Add a Blog (Admin Only)
router.post("/add", authenticateUser, async (req, res) => {
  const { title, content, image_url } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const sql = "INSERT INTO blogs (title, content, image_url) VALUES (?, ?, ?)";
    await db.query(sql, [title, content, image_url]);

    res.json({ message: "Blog added successfully" });
  } catch (error) {
    console.error("Blog Error:", error);
    res.status(500).json({ error: "Server error while adding blog" });
  }
});

// Get All Blogs
router.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM blogs ORDER BY created_at DESC";
    const [blogs] = await db.query(sql);
    res.json(blogs);
  } catch (error) {
    console.error("Fetch Blog Error:", error);
    res.status(500).json({ error: "Error fetching blogs" });
  }
});

// Delete a Blog (Admin Only)
router.delete("/:id", authenticateUser, async (req, res) => {
  const blogId = req.params.id;

  try {
    const sql = "DELETE FROM blogs WHERE id = ?";
    await db.query(sql, [blogId]);

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    res.status(500).json({ error: "Error deleting blog" });
  }
});

module.exports = router;
