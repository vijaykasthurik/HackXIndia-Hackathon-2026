const mongoose = require('mongoose');
const logger = require('../utils/logger'); // ✅ import logger

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_KEY);
        logger.info('MongoDB connected successfully'); // ✅ log success
    } catch (err) {
        logger.error(`MongoDB connection error: ${err.message}`); // ✅ log error
        process.exit(1);
    }
};

module.exports = connectDB;
