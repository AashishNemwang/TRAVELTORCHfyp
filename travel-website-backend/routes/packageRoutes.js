const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createPackage } = require('../controllers/packageController');

// Setup multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// POST /api/packages
router.post('/', upload.single('photo'), createPackage);

module.exports = router;
