const express = require("express");
const router = express.Router();
const db = require("../db");

// Book a travel package
router.post("/bookings", (req, res) => {
  const { traveler_id, package_id, payment_method } = req.body;

  if (!traveler_id || !package_id || !payment_method) {
    return res.status(400).json({ message: "All fields are required." });
  }

  db.query(
    "INSERT INTO bookings (traveler_id, package_id, payment_method) VALUES (?, ?, ?)",
    [traveler_id, package_id, payment_method],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Booking successful!", booking_id: result.insertId });
    }
  );
});

// Get bookings for a traveler
router.get("/bookings/:traveler_id", (req, res) => {
  const traveler_id = req.params.traveler_id;
  db.query(
    "SELECT b.*, p.name AS package_name, p.price FROM bookings b JOIN travel_packages p ON b.package_id = p.package_id WHERE b.traveler_id = ?",
    [traveler_id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ bookings: result });
    }
  );
});

// Update payment status (for online payments)
router.put("/bookings/:id/payment", (req, res) => {
  const booking_id = req.params.id;
  db.query(
    "UPDATE bookings SET payment_status = 'paid' WHERE booking_id = ?",
    [booking_id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Payment confirmed!" });
    }
  );
});

module.exports = router;
