const Plant = require('../models/Plant');
const Signup = require('../models/Signup');
const logger = require('../utils/logger'); // 👈 Add this

exports.addPlant = async (req, res) => {
    const token = req.headers['x-auth-token'];
    if (!token) {
        logger.warn('[AUTH] Missing token in addPlant');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const user = await Signup.findById(token);
        if (!user) {
            logger.warn(`[AUTH] Invalid user token in addPlant: ${token}`);
            return res.status(401).json({ message: 'Invalid user' });
        }

        const newPlant = await Plant.create({ ...req.body, userId: user._id });
        logger.info(`[ADD PLANT] New plant added for user ${user._id}: ${newPlant._id}`);
        res.json(newPlant);
    } catch (err) {
        logger.error(`[ADD PLANT ERROR] ${err.message}`);
        res.status(500).json({ message: 'Failed to add plant' });
    }
};

exports.getPlants = async (req, res) => {
    const token = req.headers['x-auth-token'];
    if (!token) {
        logger.warn('[AUTH] Missing token in getPlants');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const plants = await Plant.find({ userId: token });
        logger.info(`[GET PLANTS] Retrieved ${plants.length} plants for user ${token}`);
        res.json(plants);
    } catch (err) {
        logger.error(`[GET PLANTS ERROR] ${err.message}`);
        res.status(500).json({ message: 'Failed to fetch plants' });
    }
};

exports.deletePlant = async (req, res) => {
    const token = req.headers['x-auth-token'];
    if (!token) {
        logger.warn('[AUTH] Missing token in deletePlant');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        await Plant.deleteOne({ _id: req.params.id, userId: token });
        logger.info(`[DELETE PLANT] Plant ${req.params.id} deleted for user ${token}`);
        res.json({ message: 'Plant deleted' });
    } catch (err) {
        logger.error(`[DELETE PLANT ERROR] ${err.message}`);
        res.status(500).json({ message: 'Failed to delete plant' });
    }
};
