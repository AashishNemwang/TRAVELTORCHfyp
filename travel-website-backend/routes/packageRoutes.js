const express = require("express");
const router = express.Router();
const packageController = require("../controllers/packageController");
const { verifyToken, checkAgencyRole } = require("../middleware/authMiddleware");
const multer = require("multer");

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// Public routes
router.get("/", packageController.getAllPackages);
router.get("/:id", packageController.getPackageById);

// Protected routes
router.post(
  "/",
  verifyToken,
  checkAgencyRole,
  upload.single('photo'), // Add Multer middleware here
  packageController.addPackage
);

router.put(
  "/:id",
  verifyToken,
  checkAgencyRole,
  upload.single('photo'), // Also for updates
  packageController.updatePackage
);

router.delete(
  "/:id",
  verifyToken,
  checkAgencyRole,
  packageController.deletePackage
);

module.exports = router;