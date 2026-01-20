const express = require('express');
const router = express.Router();
const { addPlant, getPlants, deletePlant } = require('../controllers/plantController');

router.post('/', addPlant);
router.get('/', getPlants);
router.delete('/:id', deletePlant);

module.exports = router;
