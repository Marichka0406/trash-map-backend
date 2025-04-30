const mongoose = require('mongoose');

const trashMarkHistorySchema = new mongoose.Schema({
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['collected', 'not collected'],
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
    required: true,
    validate: v => Array.isArray(v) && v.length > 0,
  },
}, { _id: false });

module.exports = trashMarkHistorySchema;
