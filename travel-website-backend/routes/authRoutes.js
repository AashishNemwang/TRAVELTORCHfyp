const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyAdmin } = require("../middleware/authMiddleware");
const { check } = require('express-validator');

// Public routes
router.post(
  "/register/traveler",
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
  ],
  authController.registerTraveler
);

router.post(
  "/register/agency",
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    check('agencyName', 'Agency name is required').not().isEmpty()
  ],
  authController.registerAgency
);

router.post(
  "/login",
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  authController.login
);

// Protected admin route
router.post(
  "/register/admin",
  [
    verifyAdmin,
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
  ],
  authController.registerAdmin
);

// Protected user route
router.get("/me", authController.getLoggedInUser);

module.exports = router;

