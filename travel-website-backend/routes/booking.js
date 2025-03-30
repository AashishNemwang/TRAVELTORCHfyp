const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authenticateUser = require("../middleware/authMiddleware");

// Book a Package
router.post("/book", authenticateUser, async (req, res) => {
  const { traveler_id, package_id, payment_status, payment_method } = req.body;

  if (!traveler_id || !package_id || !payment_status || !payment_method) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const sql = "INSERT INTO bookings (traveler_id, package_id, payment_status, payment_method) VALUES (?, ?, ?, ?)";
    await db.query(sql, [traveler_id, package_id, payment_status, payment_method]);
    
    res.json({ message: "Booking Successful" });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ error: "Server error while booking" });
  }
});

// Get Traveler's Bookings
router.get("/traveler/:id", authenticateUser, async (req, res) => {
  const traveler_id = req.params.id;

  try {
    const sql = `
      SELECT b.id, p.name AS package_name, p.price, b.payment_status, b.payment_method
      FROM bookings b
      JOIN packages p ON b.package_id = p.id
      WHERE b.traveler_id = ?`;

    const [bookings] = await db.query(sql, [traveler_id]);
    res.json(bookings);
  } catch (error) {
    console.error("Fetch Booking Error:", error);
    res.status(500).json({ error: "Error fetching bookings" });
  }
});

// Get All Bookings (Admin View)
router.get("/all", authenticateUser, async (req, res) => {
  try {
    const sql = `
      SELECT b.id, t.username AS traveler, p.name AS package, p.price, b.payment_status, b.payment_method
      FROM bookings b
      JOIN travelers t ON b.traveler_id = t.id
      JOIN packages p ON b.package_id = p.id`;

    const [bookings] = await db.query(sql);
    res.json(bookings);
  } catch (error) {
    console.error("Admin Fetch Booking Error:", error);
    res.status(500).json({ error: "Error fetching all bookings" });
  }
});

module.exports = router;
