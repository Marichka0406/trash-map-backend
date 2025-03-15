const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware('admin'), PostController.createPost);
router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getPostById);
router.put('/:id', authMiddleware('admin'), PostController.updatePost);
router.delete('/:id', authMiddleware('admin'), PostController.deletePost);

module.exports = router;
