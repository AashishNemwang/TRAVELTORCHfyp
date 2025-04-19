const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../config/db');

// Uploads directory
const uploadDir = path.join(__dirname, '../uploads');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and GIF files are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// CREATE package
const createPackage = async (req, res) => {
  try {
    const { name, destination, type, price, startDate, endDate, duration, description } = req.body;
    const photo = req.file ? req.file.filename : null;
    const agencyId = req.user.id;

    if (!name || !destination || !type || !price || !startDate || !endDate || !duration || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!photo) {
      return res.status(400).json({ message: "Package image is required" });
    }

    const query = `
      INSERT INTO travel_package 
      (name, destination, type, price, startDate, endDate, duration, description, photo, agency_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, destination, type, price, startDate, endDate, duration, description, photo, agencyId];
    const [result] = await db.query(query, values);

    res.status(201).json({ message: "Package created", packageId: result.insertId });
  } catch (err) {
    console.error(err);
    if (req.file) {
      fs.unlink(path.join(uploadDir, req.file.filename), () => {});
    }
    res.status(500).json({ message: "Server error" });
  }
};

// GET all packages
const getAllPackages = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.*, u.username AS agency_name
      FROM travel_package p
      LEFT JOIN users u ON p.agency_id = u.id
      ORDER BY p.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch packages" });
  }
};

// GET single package
const getPackageById = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.*, u.username AS agency_name
      FROM travel_package p
      LEFT JOIN users u ON p.agency_id = u.id
      WHERE p.id = ?
    `, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching package" });
  }
};

// DELETE package
const deletePackage = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT photo FROM travel_package WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Package not found' });

    const photoPath = path.join(uploadDir, rows[0].photo);
    if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath);

    await db.query('DELETE FROM travel_package WHERE id = ?', [req.params.id]);
    res.json({ message: 'Package deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete package' });
  }
};

module.exports = {
  upload,
  createPackage,
  getAllPackages,
  getPackageById,
  deletePackage,
};
