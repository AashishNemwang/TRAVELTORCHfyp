// // const Booking = require("../models/Booking");

// exports.addBooking = (req, res) => {
//   const traveler_id = req.user.id; // Authenticated Traveler
//   const { package_id, payment_method } = req.body;
//   const status = "Pending"; // Default status

//   if (!package_id || !payment_method) {
//     return res.status(400).json({ message: "Package ID and payment method are required" });
//   }

//   Booking.addBooking({ traveler_id, package_id, payment_method, status }, (err) => {
//     if (err) return res.status(500).json({ message: "Database error" });
//     res.status(201).json({ message: "Booking successful" });
//   });
// };

// exports.getTravelerBookings = (req, res) => {
//   Booking.getTravelerBookings(req.user.id, (err, results) => {
//     if (err) return res.status(500).json({ message: "Database error" });
//     res.json(results);
//   });
// };

// exports.getAgencyBookings = (req, res) => {
//   Booking.getAgencyBookings(req.user.id, (err, results) => {
//     if (err) return res.status(500).json({ message: "Database error" });
//     res.json(results);
//   });
// };

// exports.getAllBookings = (req, res) => {
//   Booking.getAllBookings((err, results) => {
//     if (err) return res.status(500).json({ message: "Database error" });
//     res.json(results);
//   });
// };

// exports.updateBookingStatus = (req, res) => {
//   const { status } = req.body;
//   Booking.updateBookingStatus(req.params.id, status, (err) => {
//     if (err) return res.status(500).json({ message: "Database error" });
//     res.json({ message: "Booking status updated successfully" });
//   });
// };
