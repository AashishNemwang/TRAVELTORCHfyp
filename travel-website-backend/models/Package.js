// // models/Package.js
// const db = require('../config/db'); // Ensure you have your DB connection setup

// class Package {
//   static addPackage(data, callback) {
//     const query = 'INSERT INTO packages (name, description, date, price, photo, agency_id) VALUES (?, ?, ?, ?, ?, ?)';
//     db.query(query, [data.name, data.description, data.date, data.price, data.photo, data.agency_id], callback);
//   }

//   static getAllPackages(filters, callback) {
//     let query = 'SELECT * FROM packages WHERE 1=1';
//     const params = [];

//     if (filters.search) {
//       query += ' AND name LIKE ?';
//       params.push(`%${filters.search}%`);
//     }
//     // Add other filters similarly...
//     db.query(query, params, callback);
//   }

//   static getPackageById(id, callback) {
//     db.query('SELECT * FROM packages WHERE id = ?', [id], callback);
//   }

//   static updatePackage(id, data, callback) {
//     const query = 'UPDATE packages SET name=?, description=?, date=?, price=?, photo=? WHERE id=?';
//     db.query(query, [data.name, data.description, data.date, data.price, data.photo, id], callback);
//   }

//   static deletePackage(id, callback) {
//     db.query('DELETE FROM packages WHERE id = ?', [id], callback);
//   }
// }

// module.exports = Package;