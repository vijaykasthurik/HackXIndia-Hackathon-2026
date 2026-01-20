const Signup = require('../models/Signup');
const Login = require('../models/Login');
const sendEmail = require('../services/emailService');
const bcrypt = require('bcryptjs');
const logger = require('../utils/logger'); // ✅

let otpStore = {};

const isStrongPassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

exports.signup = async (req, res) => {
  const { name, email, password, city, otp } = req.body;

  const existingUser = await Signup.findOne({ email });
  if (existingUser) {
    logger.warn(`[SIGNUP] Attempt with existing email: ${email}`);
    return res.status(400).json({ message: 'You already have an account' });
  }

  const otpData = otpStore[email];
  if (!otpData || otpData.code !== otp || otpData.expiry < Date.now()) {
    logger.warn(`[SIGNUP] Invalid or expired OTP for ${email}`);
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  if (!isStrongPassword(password)) {
    logger.warn(`[SIGNUP] Weak password attempt by ${email}`);
    return res.status(400).json({
      message: 'Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character.'
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await Signup.create({ name, email, password: hashedPassword, city });
    delete otpStore[email];
    logger.info(`[SIGNUP] New user registered: ${email}`);
    res.json({ message: 'Signup successful' });
  } catch (error) {
    logger.error(`[SIGNUP ERROR] ${error.message}`);
    res.status(500).json({ message: 'Signup failed' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Signup.findOne({ email });
    if (!user) {
      logger.warn(`[LOGIN] Invalid email: ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`[LOGIN] Invalid password for ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    await Login.create({ email });
    logger.info(`[LOGIN] User logged in: ${email}`);
    res.json({ token: user._id.toString(), user });
  } catch (error) {
    logger.error(`[LOGIN ERROR] ${error.message}`);
    res.status(500).json({ message: 'Login failed' });
  }
};

exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  const user = await Signup.findOne({ email });
  if (user) {
    logger.warn(`[OTP] Attempt to generate OTP for existing user: ${email}`);
    return res.status(400).json({ message: 'You already have an account' });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = Date.now() + 5 * 60 * 1000;
  otpStore[email] = { code, expiry };

  const mailOptions = {
    to: email,
    subject: 'Growlify Email Verification OTP',
    text: `Your OTP is ${code}. It is valid for 5 minutes.`
  };

  try {
    await sendEmail(mailOptions);
    logger.info(`[OTP] Sent signup OTP to ${email}`);
    res.json({ message: 'OTP sent' });
  } catch (error) {
    logger.error(`[SEND OTP ERROR] ${error.message}`);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

exports.sendResetOTP = async (req, res) => {
  const { email } = req.body;
  const user = await Signup.findOne({ email });
  if (!user) {
    logger.warn(`[RESET OTP] No account found for ${email}`);
    return res.status(404).json({ message: 'No account found with this email' });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = Date.now() + 5 * 60 * 1000;
  otpStore[email] = { code, expiry };

  const mailOptions = {
    to: email,
    subject: 'Growlify Password Reset OTP',
    text: `You've requested to reset your password.\n\nYour OTP is: ${code} (valid for 5 minutes).\n\nIf you didn't request this, you can ignore this email.\n\n– Team Growlify`
  };

  try {
    await sendEmail(mailOptions);
    logger.info(`[RESET OTP] Sent password reset OTP to ${email}`);
    res.json({ message: 'Password reset OTP sent to your email.' });
  } catch (error) {
    logger.error(`[SEND RESET OTP ERROR] ${error.message}`);
    res.status(500).json({ message: 'Failed to send reset OTP' });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword, otp } = req.body;

  const otpData = otpStore[email];
  if (!otpData || otpData.code !== otp || otpData.expiry < Date.now()) {
    logger.warn(`[RESET PASSWORD] Invalid/expired OTP for ${email}`);
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  if (!isStrongPassword(newPassword)) {
    logger.warn(`[RESET PASSWORD] Weak password attempt by ${email}`);
    return res.status(400).json({
      message: 'Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character.'
    });
  }

  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    await Signup.updateOne({ email }, { password: hashed });
    delete otpStore[email];
    logger.info(`[RESET PASSWORD] Password reset successful for ${email}`);
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    logger.error(`[RESET PASSWORD ERROR] ${error.message}`);
    res.status(500).json({ message: 'Password reset failed' });
  }
};
