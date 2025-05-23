const trashMarkService = require('../services/trashMarkService');

const getAllTrashMarks = async (req, res) => {
  try {
    const role = req.user?.role || 'guest'; 
    const data = await trashMarkService.getAllTrashMarks(role);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getTrashMarkById = async (req, res) => {
  try {
    const data = await trashMarkService.getTrashMarkById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createTrashMark = async (req, res) => {
  try {
    const trashMark = await trashMarkService.createTrashMark(req.body, req.user.userId);
    res.status(201).json(trashMark);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTrashMarkStatus = async (req, res) => {
  try {
    const updated = await trashMarkService.updateTrashMarkStatus(
      req.params.id,
      req.body,
      req.user.id
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateTrashMarkMetadata = async (req, res) => {
  try {
    const updated = await updateTrashMarkMetadata(req.params.id, req.body, req.user.id);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTrashMark = async (req, res) => {
  try {
    await trashMarkService.deleteTrashMark(req.params.id, req.user.userId);
    res.status(200).json({ message: 'Trash mark deleted' });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

module.exports = {
  getAllTrashMarks,
  getTrashMarkById,
  createTrashMark,
  updateTrashMarkStatus,
  updateTrashMarkMetadata,
  deleteTrashMark,
};