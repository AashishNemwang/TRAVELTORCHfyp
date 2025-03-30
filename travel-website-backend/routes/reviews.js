const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authenticateUser = require("../middleware/authMiddleware");

// Add a Review (Traveler Only)
router.post("/add", authenticateUser, async (req, res) => {
  const { package_id, user_id, rating, review_text } = req.body;

  if (!package_id || !rating || !review_text) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const sql = "INSERT INTO reviews (package_id, user_id, rating, review_text) VALUES (?, ?, ?, ?)";
    await db.query(sql, [package_id, user_id, rating, review_text]);

    res.json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Review Error:", error);
    res.status(500).json({ error: "Server error while adding review" });
  }
});

// Get Reviews for a Package
router.get("/:package_id", async (req, res) => {
  try {
    const sql = "SELECT r.*, u.username FROM reviews r JOIN users u ON r.user_id = u.id WHERE package_id = ?";
    const [reviews] = await db.query(sql, [req.params.package_id]);

    res.json(reviews);
  } catch (error) {
    console.error("Fetch Review Error:", error);
    res.status(500).json({ error: "Error fetching reviews" });
  }
});

// Delete a Review (Admin Only)
router.delete("/:id", authenticateUser, async (req, res) => {
  const reviewId = req.params.id;

  try {
    const sql = "DELETE FROM reviews WHERE id = ?";
    await db.query(sql, [reviewId]);

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Delete Review Error:", error);
    res.status(500).json({ error: "Error deleting review" });
  }
});

module.exports = router;
