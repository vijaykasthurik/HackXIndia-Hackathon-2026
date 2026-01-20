const hasTipBeenSent = (plant, dayLabel) => {
    return plant.tipsSent.includes(dayLabel);
};

const markTipAsSent = async (plant, dayLabel) => {
    if (!hasTipBeenSent(plant, dayLabel)) {
        plant.tipsSent.push(dayLabel);
        await plant.save();
    }
};

module.exports = { hasTipBeenSent, markTipAsSent };
