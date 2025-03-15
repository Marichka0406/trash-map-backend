const Post = require("../models/postModel");

// Створити пост
const createPost = async ({ adminId, title, content, photoUrl }) => {
  try {
    const post = new Post({
      adminId,
      title,
      content,
      photoUrl,
    });

    await post.save();
    return post;
  } catch (err) {
    throw new Error("Error creating post");
  }
};

// Отримати всі пости
const getAllPosts = async () => {
  try {
    return await Post.find();
  } catch (err) {
    throw new Error("Error fetching posts");
  }
};

// Отримати пост за ID
const getPostById = async (id) => {
  try {
    return await Post.findById(id);
  } catch (err) {
    throw new Error("Error fetching post");
  }
};

// Оновити пост
const updatePost = async (id, updateData) => {
  try {
    return await Post.findByIdAndUpdate(id, updateData, { new: true });
  } catch (err) {
    throw new Error("Error updating post");
  }
};

// Видалити пост
const deletePost = async (id) => {
  try {
    return await Post.findByIdAndDelete(id);
  } catch (err) {
    throw new Error("Error deleting post");
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
