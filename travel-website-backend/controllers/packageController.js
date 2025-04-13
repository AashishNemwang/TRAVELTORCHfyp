const db = require('../db');
const path = require('path');

exports.createPackage = (req, res) => {
  const {
    name,
    destination,
    type,
    price,
    startDate,
    endDate,
    duration,
    description
  } = req.body;

  const agency_id = req.user?.id || 1; // default to 1 if not using authentication

  const photo = req.file ? req.file.filename : null;

  if (!photo) {
    return res.status(400).json({ message: 'Image is required' });
  }

  const sql = `
    INSERT INTO travel_package
    (name, destination, type, price, startDate, endDate, duration, description, photo, agency_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    name,
    destination,
    type,
    price,
    startDate,
    endDate,
    duration,
    description,
    photo,
    agency_id
  ], (err, result) => {
    if (err) {
      console.error('Error inserting package:', err);
      return res.status(500).json({ message: 'Failed to create package' });
    }

    return res.status(201).json({ message: 'Package created successfully' });
  });
};
