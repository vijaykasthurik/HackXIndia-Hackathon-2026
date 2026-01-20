const Plant = require('../models/Plant');
const Signup = require('../models/Signup');
const { getWeather } = require('../services/weatherService');
const sendEmail = require('../services/emailService');
const logger = require('../utils/logger');
exports.manualReminder = async (req, res) => {
    try {
        const plants = await Plant.find({});

        for (const plant of plants) {
            const user = await Signup.findById(plant.userId);
            if (!user || !user.city || !user.email) continue;

            const weather = await getWeather(user.city);
            const isRainy = typeof weather === 'string' && ['rain','drizzle','thunderstorm','shower','light'].some(word => weather.toLowerCase().includes(word));
            if (isRainy) continue;

            const subject = `💧 Reminder to Water Your ${plant.plantName}`;
            const text = `Hello ${user.name || 'Grower'},\n\nThis is a gentle reminder from your green buddy **${plant.plantName || 'Plant'}**.\n\nPlease water me today! I’m feeling a bit thirsty 🌿\nLocation: ${plant.location || 'your garden'}\nRecommended amount: 150ml\n\nStay rooted,\n– ${plant.plantName || 'Your Plant'}\n\n– Team Growlify`;

            await sendEmail({ to: user.email, subject, text });
        }

        res.json({ message: 'Manual watering reminders sent successfully' });
    } catch (error) {
        logger.error('[MANUAL REMINDER ERROR]', error.message);
        res.status(500).json({ message: 'Failed to send reminders' });
    }
};