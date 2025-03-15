const trashMarkService = require("../services/trashMarkService");

// Create a new trash mark
const createTrashMark = async (req, res) => {
  try {
    const data = { ...req.body, userId: req.user.userId };
    const trashMark = await trashMarkService.createTrashMark(data);
    res.status(201).json(trashMark);
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

// Get all trash marks
const getAllTrashMarks = async (req, res) => {
  try {
    const trashMarks = await trashMarkService.getAllTrashMarks();
    res.status(200).json(trashMarks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trash marks', error: error.message }); 
  }
};

// Get a single trash mark by ID
const getTrashMarkById = async (req, res) => {
  try {
    const trashMark = await trashMarkService.getTrashMarkById(req.params.id);
    if (!trashMark) {
        return res.status(404).json({ message: 'Trash mark not found' });
    }
    res.status(200).json(trashMark);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trash mark', error: error.message }); 
  }
};

// Update a trash mark
const updateTrashMark = async (req, res) => {
  try {
    const trashMark = await trashMarkService.updateTrashMark(
      req.params.id,
      req.body
    );
    res.status(200).json(trashMark);
  } catch (error) {
    res.status(500).json({ message: 'Error updating trash marks', error: error.message });
  }
};

// Delete a trash mark
const deleteTrashMark = async (req, res) => {
  try {
    await trashMarkService.deleteTrashMark(req.params.id);
    res.status(200).json({ message: "Trash mark deleted" });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trash mark', error: error.message }); 
  }
};

module.exports = {
  createTrashMark,
  getAllTrashMarks,
  getTrashMarkById,
  updateTrashMark,
  deleteTrashMark,
};
