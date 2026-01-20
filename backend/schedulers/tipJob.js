const Plant = require('../models/Plant');
const Signup = require('../models/Signup');
const { sendEmail } = require('../services/emailService');
const { hasTipBeenSent, markTipAsSent } = require('../utils/tipTracker');
const logger = require('../utils/logger'); // 👈 import logger

const tips = {
  5: {
    tip: 'Crushed eggshells boost calcium for stronger stems.',
    item: 'Organic Eggshell Mix'
  },
  10: {
    tip: 'Onion peels enrich soil with potassium and phosphorus.',
    item: 'Natural Onion Peel Fertilizer'
  },
  15: {
    tip: 'Banana peel water adds magnesium and helps blooming.',
    item: 'Banana Peel Growth Booster'
  },
  20: {
    tip: 'Used tea leaves improve soil texture and nutrient levels.',
    item: 'Eco Tea Leaf Soil Enhancer'
  }
};

const sendOrganicTips = async () => {
  logger.info('[NODE-CRON] Running organic tips job'); // 👍 Replaced console.log

  try {
    const plants = await Plant.find({}).lean();
    const today = new Date();

    for (const plant of plants) {
      const user = await Signup.findById(plant.userId);
      if (!user || !user.email) continue;

      const daysOld = Math.floor((today - new Date(plant.datePlanted)) / (1000 * 60 * 60 * 24));

      if (tips[daysOld] && !hasTipBeenSent(plant._id, daysOld)) {
        const { tip, item } = tips[daysOld];

        const subject = `🌿 Message from your plant: Day ${daysOld} Care Tip`;

        const text = `
Hi ${user.name || 'Green Friend'} 🌱,

It's me, your plant *${plant.plantName || 'Green Buddy'}* speaking!

I just wanted to thank you for taking care of me. You've been awesome! 🪴
Today is **Day ${daysOld}** of my journey, and I have a tiny request...

🌼 *"${tip}"*

Could you please try this today? I’d really appreciate it. It’ll help me grow stronger and greener!

And by the way… if you're looking for some help, you can always:

🛒 **[Check out our organic ${item}]**

👉 Visit: https://growlify.shop/products

Thanks again for growing with love! 💚

Yours leaf-fully,
*${plant.plantName || 'Your Plant'}*

– Team Growlify 🌿
        `;

        await sendEmail({
          to: user.email,
          subject,
          text
        });

        markTipAsSent(plant._id, daysOld);

        logger.info(`[TIP SENT] Day ${daysOld} tip sent to ${user.email} for ${plant.plantName}`); // 👍
      }
    }
  } catch (err) {
    logger.error(`[NODE-CRON] Error in organic tip job: ${err.message}`); // 👍
  }
};

module.exports = { sendOrganicTips };
