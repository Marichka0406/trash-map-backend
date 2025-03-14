const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  locations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrashMark',
    required: true,
  }],
  date: {
    type: Date,
    required: true,
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  status: {
    type: String,
    enum: ['upcoming', 'completed', 'canceled'],
    required: true,
  },
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
