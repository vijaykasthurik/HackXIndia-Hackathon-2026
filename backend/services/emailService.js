const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env
const logger = require('../utils/logger');
const Signup = require('../models/Signup');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async ({ to, subject, text }) => {
  if (!to || typeof to !== 'string') {
    logger.error('❌ Cannot send email — recipient address is missing or invalid:', to);
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`✅ Email sent successfully to ${to}`);
  } catch (err) {
   logger.error(`❌ Failed to send email to ${to}:`, err);
  }
};

module.exports = sendEmail;
