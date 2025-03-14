const mongoose = require('mongoose');

const bonusSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Bonus = mongoose.model('Bonus', bonusSchema);

module.exports = Bonus;
