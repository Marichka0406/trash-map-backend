const mongoose = require('mongoose');
const trashMarkHistorySchema = require('./trashMarkHistoryModel');

const trashMarkSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
  photos: {
    type: [String],
    required: true,
    validate: v => Array.isArray(v) && v.length > 0,
  },
  status: {
    type: String,
    enum: ['collected', 'not collected'],
    required: true,
  },
  trashMarkHistory: [trashMarkHistorySchema],
  lastStatusUpdateAt: {
    type: Date
  }
}, { timestamps: true });

trashMarkSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('TrashMark', trashMarkSchema);
