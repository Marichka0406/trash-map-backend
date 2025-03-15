const mongoose = require('mongoose');

const trashMarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  description: {
    type: String,
    required: false,
  },
  photoUrl: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    enum: ['little', 'medium', 'many'],
    required: false,
  },
  status: {
    type: String,
    enum: ['collected', 'not collected'],
    required: true,
  },
}, { timestamps: true });

trashMarkSchema.index({ location: '2dsphere' });

const TrashMark = mongoose.model('TrashMark', trashMarkSchema);

module.exports = TrashMark;
