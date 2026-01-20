// schedulers/wateringJob.js

const Plant = require('../models/Plant');
const Signup = require('../models/Signup');
const sendEmail = require('../services/emailService');
const getWeather = require('../services/weatherService');
const logger = require('../utils/logger'); // 🌟 Logging support

// 🌟 Motivational quotes or plant facts
const quotes = [
  "🌿 \"To plant a garden is to believe in tomorrow.\" – Audrey Hepburn",
  "🌱 \"Your mind is a garden. Your thoughts are the seeds. You can grow flowers or weeds.\"",
  "🌸 \"The earth laughs in flowers.\" – Ralph Waldo Emerson",
  "🌞 \"Keep growing, even if no one applauds you.\"",
  "🌼 \"Grow through what you go through.\"",
  "🍃 \"Let your dreams blossom like your garden.\"",
  "🌻 \"Where flowers bloom, so does hope.\" – Lady Bird Johnson"
];

const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];

const getTimeGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning!";
  if (hour < 17) return "Good afternoon!";
  return "Good evening!";
};

const sendWateringReminders = async (location) => {
  logger.info(`[NODE-CRON] Running watering reminder job for location: ${location}`);

  try {
    const plants = await Plant.find({});
    const users = await Signup.find({});

    for (const plant of plants) {
      if (!plant.userId) {
        logger.warn(`[SKIP] Plant "${plant.plantName}" has no userId`);
        continue;
      }

      const isMatchingLocation =
        (location === '2-3 times/week' && plant.schedule === '2-3 times/week') ||
        (plant.location && plant.location.toLowerCase() === location.toLowerCase());

      if (!isMatchingLocation) continue;

      const user = users.find(u => u._id.toString() === plant.userId.toString());
      if (!user || !user.city || !user.email) {
        logger.warn(`[SKIP] Missing user data for plant "${plant.plantName}" — userId: ${plant.userId}`);
        continue;
      }

      // 🌧️ Weather check
      const weather = await getWeather(user.city);
      if (typeof weather === 'string') {
        const lowerWeather = weather.toLowerCase();
        const rainyWords = ['rain', 'drizzle', 'thunderstorm', 'shower', 'light'];
        if (rainyWords.some(word => lowerWeather.includes(word))) {
          logger.info(`[SKIP] Weather in ${user.city} is "${weather}". Skipping watering email to ${user.email}`);
          continue;
        }
      }

      // 💧 Determine water amount
      let amount = '150ml';
      if (plant.location === 'Indoor') {
        amount = '80–100ml (twice daily)';
      } else if (plant.location === 'Balcony') {
        amount = '75–100ml (twice daily)';
      } else if (plant.location === 'Outdoor') {
        amount = '60–80ml (3 times daily)';
      } else if (plant.schedule === '2-3 times/week') {
        amount = '200–300ml';
      }

      const quote = getRandomQuote();
      const greeting = getTimeGreeting();

      const subject = `💧 ${plant.plantName || 'Your Plant'} needs watering (${greeting})`;

      const text = `
${greeting} ${user.name || 'Gardener'} 🌞,

It's me, your plant *${plant.plantName || 'Green Buddy'}*! 🌿

I just wanted to whisper gently... I'm feeling a little thirsty right now. Could you please give me some water?

📍 I'm in the **${plant.location || 'garden'}**
💧 I’d love about **${amount}**

Weather in ${user.city} is currently "${weather}" — looks like it's safe to water me. 🌤️

✨ Quote of the Day:
${quote}

Thanks for always caring for me. Your love helps me grow 🌱💚

Leaf-fully yours,  
*${plant.plantName || 'Your Plant'}*

– Team Growlify 🌿
      `;

      await sendEmail({
        to: user.email,
        subject,
        text
      });

      logger.info(`[EMAIL SENT] to ${user.email} for ${plant.plantName}`);
    }
  } catch (err) {
    logger.error(`[NODE-CRON] Error in watering reminder: ${err.stack || err.message}`);
  }
};

module.exports = { sendWateringReminders };
