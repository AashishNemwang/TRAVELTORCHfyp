const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const getLoggedInUser = require('../controllers/getLoggedInUser');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', [
  check('username').notEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  check('confirmPassword').notEmpty().withMessage('Confirm password is required'),
], authController.signup);

router.post('/login', [
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').notEmpty().withMessage('Password is required'),
], authController.login);

router.get('/loggedInUser',getLoggedInUser);
router.delete('/logout',authController.logout);

// router.get('/me',authMiddleware,authController.getCurrentUser);

module.exports = router;