const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
