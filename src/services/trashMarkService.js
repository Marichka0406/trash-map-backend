const TrashMark = require('../models/trashMarkModel');

const getAllTrashMarks = async (userRole) => {
  if (userRole === 'user' || userRole === 'guest') {
    return await TrashMark.find({}, 'status location');
  }

  return await TrashMark.find();
};

const getTrashMarkById = async (id) => {
  const trashMark = await TrashMark.findById(id).populate('createdBy updatedBy trashMarkHistory.updatedBy');
  if (!trashMark) throw new Error('Trash mark not found');
  return trashMark;
};

const createTrashMark = async (data, userId) => {
  const {
    description,
    location,
    status,
    photos,
  } = data;

  if (!photos || photos.length === 0) {
    throw new Error('Photos are required');
  }

  return TrashMark.create({
    description,
    location,
    status,
    photos,
    createdBy: userId,
    updatedBy: userId,
    trashMarkHistory: [{
      updatedBy: userId,
      status,
      description,
      photos,
    }],
  });
};

const updateTrashMarkMetadata = async (id, data, userId) => {
  const trashMark = await TrashMark.findById(id);
  if (!trashMark) throw new Error('Trash mark not found');

  const { description, photos } = data;

  if (!description && !photos) {
    throw new Error('Nothing to update');
  }

  if (trashMark.updatedBy.toString() !== userId) {
    throw new Error('Only the last updater can edit description or photos');
  }

  if (photos && photos.length === 0) {
    throw new Error('Photos array cannot be empty');
  }

  if (description) trashMark.description = description;
  if (photos) trashMark.photos = photos;

  const lastEntry = trashMark.trashMarkHistory[trashMark.trashMarkHistory.length - 1];
  if (lastEntry && lastEntry.updatedBy.toString() === userId) {
    if (description) lastEntry.description = description;
    if (photos) lastEntry.photos = photos;
  }

  return trashMark.save();
};

const updateTrashMarkStatus = async (id, data, userId) => {
  const trashMark = await TrashMark.findById(id);
  if (!trashMark) throw new Error('Trash mark not found');

  const { status, description, photos } = data;

  if (!status || !description || !photos || photos.length === 0) {
    throw new Error('Status, description and non-empty photos are required');
  }

  const historyEntry = {
    updatedBy: userId,
    status,
    description,
    photos,
    updatedAt: new Date()
  };

  trashMark.trashMarkHistory.push(historyEntry);

  trashMark.status = status;
  trashMark.description = description;
  trashMark.photos = photos;
  trashMark.updatedBy = userId;
  trashMark.lastStatusUpdateAt = updatedAt;

  return trashMark.save();
};


const deleteTrashMark = async (id, userId) => {
  const trashMark = await TrashMark.findById(id);
  if (!trashMark) throw new Error('Trash mark not found');

  if (trashMark.createdBy.toString() !== userId) {
    throw new Error('Only the creator can delete this trash mark');
  }

  await TrashMark.findByIdAndDelete(id);
};

module.exports = {
  getAllTrashMarks,
  getTrashMarkById,
  createTrashMark,
  updateTrashMarkMetadata,
  updateTrashMarkStatus,
  deleteTrashMark,
};
