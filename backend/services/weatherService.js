const axios = require('axios');
require('dotenv').config(); // ✅ Load .env variables
const logger = require('../utils/logger');
/**
 * Fetches the current weather condition for a city.
 * @param {string} city - The city to check weather for.
 * @returns {string} - Weather description like "Clear", "Rain", etc.
 */
const getWeather = async (city) => {
  try {
    const encodedCity = encodeURIComponent(city);
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

    const response = await axios.get(url);
    const mainCondition = response.data.weather[0].main; // e.g., "Clear", "Rain"

    return mainCondition;
  } catch (error) {
    logger.error('Error fetching weather for', city, ':', error.message);
    return 'Unknown';
  }
};

module.exports = getWeather;
