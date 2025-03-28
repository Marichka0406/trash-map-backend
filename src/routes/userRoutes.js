const express = require('express');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/', authMiddleware('admin'), UserController.getAllUsers); 
router.get('/:id', authMiddleware(), UserController.getUserById); 
router.put('/:id', authMiddleware(), UserController.updateUser); 
router.delete('/:id', authMiddleware('admin'), UserController.deleteUser); 

module.exports = router;
