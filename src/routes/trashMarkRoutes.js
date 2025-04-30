const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const trashMarkController = require('../controllers/trashMarkController');
const router = express.Router();

router.post('/', authMiddleware(), trashMarkController.createTrashMark);
router.get('/', authMiddleware(), trashMarkController.getAllTrashMarks);
router.get('/:id', authMiddleware(), trashMarkController.getTrashMarkById);
router.put('/:id/status', authMiddleware(), trashMarkController.updateTrashMarkStatus);
router.put('/:id/metadata', authMiddleware(), trashMarkController.updateTrashMarkMetadata);
router.delete('/:id', authMiddleware(), trashMarkController.deleteTrashMark);

module.exports = router;
