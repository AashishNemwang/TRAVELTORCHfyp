const express = require('express');
const router = express.Router();
const { upload, createPackage } = require('../controllers/packageController');
const { authenticate, authorize } = require('../middleware/authMiddleware');


router.post(
  '/',
  authenticate,
  authorize(['Agency']), 
  upload.single('photo'),
  createPackage
);

module.exports = router;
