// routes/reminderRoutes.js

const express = require('express');
const router = express.Router();
const { manualReminder } = require('../controllers/reminderController');

router.get('/manual', manualReminder); // GET /api/reminders/manual

module.exports = router;
