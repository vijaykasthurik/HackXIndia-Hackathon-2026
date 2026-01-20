const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    plantName: String,
    location: String,
    sunlight: String,
    watering: String,
    image: String,
    addedDate: {
        type: Date,
        default: Date.now
    },
    tipsSent: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model('Plant', plantSchema);
