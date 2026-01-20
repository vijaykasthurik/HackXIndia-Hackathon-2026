const cron = require('node-cron');
const { sendWateringReminders } = require('./wateringJob');
const { sendOrganicTips } = require('./tipJob');
const logger = require('../utils/logger'); // Import logger

// 💧 Indoor – 8:00 AM & 6:00 PM
cron.schedule('0 8 * * *', async () => {
  logger.info('[NODE-CRON] Running watering reminder at 08:00 (Indoor)');
  try {
    await sendWateringReminders('Indoor');
  } catch (err) {
    logger.error(`Error in Indoor 08:00 watering reminder: ${err.message}`);
  }
});

cron.schedule('0 18 * * *', async () => {
  logger.info('[NODE-CRON] Running watering reminder at 18:09 (Indoor - Evening)');
  try {
    await sendWateringReminders('Indoor');
  } catch (err) {
    logger.error(`Error in Indoor 18:00 watering reminder: ${err.message}`);
  }
});

// 💧 Balcony – 7:30 AM & 6:00 PM
cron.schedule('30 7 * * *', async () => {
  logger.info('[NODE-CRON] Running watering reminder at 07:30 (Balcony)');
  try {
    await sendWateringReminders('Balcony');
  } catch (err) {
    logger.error(`Error in Balcony 07:30 watering reminder: ${err.message}`);
  }
});

cron.schedule('0 18 * * *', async () => {
  logger.info('[NODE-CRON] Running watering reminder at 18:00 (Balcony)');
  try {
    await sendWateringReminders('Balcony');
  } catch (err) {
    logger.error(`Error in Balcony 18:00 watering reminder: ${err.message}`);
  }
});

// 💧 Outdoor – 6:30 AM, 12 PM, 6:30 PM
cron.schedule('30 6 * * *', async () => {
  logger.info('[NODE-CRON] Running watering reminder at 06:30 (Outdoor)');
  try {
    await sendWateringReminders('Outdoor');
  } catch (err) {
    logger.error(`Error in Outdoor 06:30 watering reminder: ${err.message}`);
  }
});

cron.schedule('0 12 * * *', async () => {
  logger.info('[NODE-CRON] Running watering reminder at 12:00 (Outdoor)');
  try {
    await sendWateringReminders('Outdoor');
  } catch (err) {
    logger.error(`Error in Outdoor 12:00 watering reminder: ${err.message}`);
  }
});

cron.schedule('30 18 * * *', async () => {
  logger.info('[NODE-CRON] Running watering reminder at 18:30 (Outdoor)');
  try {
    await sendWateringReminders('Outdoor');
  } catch (err) {
    logger.error(`Error in Outdoor 18:30 watering reminder: ${err.message}`);
  }
});

// 💧 2–3 times/week – Mon/Wed/Fri at 7:00 AM
cron.schedule('0 7 * * 1,3,5', async () => {
  logger.info('[NODE-CRON] Running watering reminder (2–3 times/week) at 07:00');
  try {
    await sendWateringReminders('2-3 times/week');
  } catch (err) {
    logger.error(`Error in 2–3 times/week 07:00 watering reminder: ${err.message}`);
  }
});

// 🌱 Organic tips – every day at 12:00 AM
cron.schedule('0 0 * * *', async () => {
  logger.info('[NODE-CRON] Running organic tip job at midnight');
  try {
    await sendOrganicTips();
  } catch (err) {
    logger.error(`Error in organic tip job at midnight: ${err.message}`);
  }
});
