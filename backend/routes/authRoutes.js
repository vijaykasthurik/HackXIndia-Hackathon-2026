const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  sendOTP,
  sendResetOTP,   // ✅ Make sure this is imported
  resetPassword
} = require('../controllers/authController');

// Routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/send-otp', sendOTP);             // used for signup only
router.post('/send-reset-otp', sendResetOTP);  // ✅ required for forgot password
router.post('/reset-password', resetPassword);

module.exports = router;

