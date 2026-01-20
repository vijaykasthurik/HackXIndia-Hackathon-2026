const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const plantRoutes = require('./routes/plantRoutes');
const shopRoutes = require('./routes/shopRoutes');
require('dotenv').config();
require('./schedulers/cronJobs');

const nodemailer = require('nodemailer');
const logger = require('./utils/logger'); // ✅ Import logger 

const app = express();
const PORT = 5000;

// ✅ Connect to MongoDB
if (connectDB) {
  connectDB();
  logger.info('✅ MongoDB connected successfully');
}

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ✅ API Routes
app.use('/api', authRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api/shop', shopRoutes);

// ✅ Contact form endpoint
app.post('/contact', async (req, res) => {
  const { fullName, emailAddress, message } = req.body;

  if (!fullName || !emailAddress || !message) {
    logger.error('❌ Contact form submission failed: missing fields');
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${fullName}" <${emailAddress}>`,
      to: process.env.EMAIL_USER,
      subject: `🌱 New Contact from ${fullName}`,
      html: `<p><strong>Email:</strong> ${emailAddress}</p><p>${message}</p>`,
    });

    logger.info(`📩 Contact email received from ${emailAddress} by ${fullName}`);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    logger.error(`❌ Email sending failed from ${emailAddress}: ${err.message}`);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

// ✅ Server start
app.listen(PORT, () => {
  logger.info(`🌿 Growlify backend running on http://localhost:${PORT}`);
});
