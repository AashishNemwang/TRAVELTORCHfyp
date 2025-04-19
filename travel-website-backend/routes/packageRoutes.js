const express = require('express');
const router = express.Router();
const {
  upload,
  createPackage,
  getAllPackages,
  getPackageById,
  deletePackage,
} = require('../controllers/packageController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Create package (only agency)
router.post(
  '/',
  authenticate,
  authorize(['Agency']),
  upload.single('photo'),
  createPackage
);

// Get all packages (public)
router.get('/', getAllPackages);

// Get single package
router.get('/:id', getPackageById);

// Delete package (only agency)
router.delete('/:id', authenticate, authorize(['Agency']), deletePackage);

module.exports = router;
