const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  emailNotifications: {
    type: Boolean,
    default: true // ✅ default is ON
  }
});

module.exports = mongoose.model('Signup', signupSchema);
