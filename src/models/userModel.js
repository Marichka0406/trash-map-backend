const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: String,
    default: 'https://www.w3schools.com/w3images/avatar2.png', 
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;