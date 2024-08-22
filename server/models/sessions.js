const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  jwt: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '30d', // Automatically delete the session after 30 days
  },
});

module.exports = mongoose.model('Session', SessionSchema);
