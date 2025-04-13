const fs = require('fs');
const path = require('path');
const db = require('../config/db');

// Enhanced file upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
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
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const createPackage = async (req, res) => {
  try {
    const { name, destination, type, price, startDate, endDate, duration, description } = req.body;
    const photo = req.file ? req.file.filename : null;
    const agencyId = req.user.id; // Assuming you have authentication middleware

    if (!photo) {
      return res.status(400).json({ message: "Package image is required" });
    }

    const query = `
      INSERT INTO travel_package 
      (name, destination, type, price, startDate, endDate, duration, description, photo, agency_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, destination, type, price, startDate, endDate, duration, description, photo, agencyId];

    const [result] = await db.promise().query(query, values);
    
    res.status(201).json({ 
      message: "Package created successfully",
      packageId: result.insertId
    });
  } catch (err) {
    console.error("Error creating package:", err);
    
    // Clean up uploaded file if error occurs
    if (req.file) {
      fs.unlink(path.join('uploads', req.file.filename), () => {});
    }

    res.status(500).json({ 
      message: "Failed to create package",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

module.exports = {
  upload,
  createPackage
};