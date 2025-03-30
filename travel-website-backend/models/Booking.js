// // const db = require("../config/db");

// const Booking = {
//   addBooking: (booking, callback) => {
//     const { traveler_id, package_id, payment_method, status } = booking;
//     const sql = `INSERT INTO bookings (traveler_id, package_id, payment_method, status) 
//                  VALUES (?, ?, ?, ?)`;
//     db.query(sql, [traveler_id, package_id, payment_method, status], callback);
//   },

//   getTravelerBookings: (traveler_id, callback) => {
//     const sql = `SELECT b.id, tp.name AS package_name, tp.price, b.payment_method, b.status, b.created_at
//                  FROM bookings b 
//                  JOIN travel_packages tp ON b.package_id = tp.id
//                  WHERE b.traveler_id = ?`;
//     db.query(sql, [traveler_id], callback);
//   },

//   getAgencyBookings: (agency_id, callback) => {
//     const sql = `SELECT b.id, u.username AS traveler_name, tp.name AS package_name, tp.price, b.payment_method, b.status, b.created_at
//                  FROM bookings b 
//                  JOIN travel_packages tp ON b.package_id = tp.id
//                  JOIN users u ON b.traveler_id = u.id
//                  WHERE tp.agency_id = ?`;
//     db.query(sql, [agency_id], callback);
//   },

//   getAllBookings: (callback) => {
//     const sql = `SELECT b.id, u.username AS traveler_name, tp.name AS package_name, tp.price, b.payment_method, b.status, b.created_at
//                  FROM bookings b 
//                  JOIN travel_packages tp ON b.package_id = tp.id
//                  JOIN users u ON b.traveler_id = u.id`;
//     db.query(sql, callback);
//   // },

//   updateBookingStatus: (id, status, callback) => {
//     const sql = `UPDATE bookings SET status=? WHERE id=?`;
//     db.query(sql, [status, id], callback);
//   }
// };

// module.exports = Booking;
