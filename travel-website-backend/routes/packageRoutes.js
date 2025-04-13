// routes/packageRoutes.js
const express = require('express');
const router = express.Router();
const { upload, createPackage } = require('../controllers/packageController');

router.post('/', upload.single('photo'), createPackage);

module.exports = router;
