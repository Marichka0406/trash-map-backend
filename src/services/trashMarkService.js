const TrashMark = require("../models/trashMarkModel");
const { isAdminOrOwner } = require("../utils/permissionUtils");

// Create a new trash mark
const createTrashMark = async (data) => {
  const trashMark = new TrashMark(data);
  await trashMark.save();
  return trashMark;
};

// Get all trash marks
const getAllTrashMarks = async () => {
  return await TrashMark.find();
};

// Get a single trash mark by ID
const getTrashMarkById = async (id) => {
  const trashMark = await TrashMark.findById(id);
  if (!trashMark) throw new Error("Trash Mark not found");
  return trashMark;
};

// Update a trash mark (admin or owner can edit)
const updateTrashMark = async (id, updateData, userId, userRole) => {
  const trashMark = await TrashMark.findById(id);
  if (!trashMark) throw new Error("Trash Mark not found");

  if (!isAdminOrOwner(userRole, userId, trashMark)) {
    throw new Error(
      "You can only edit your own trash mark or if you are an admin"
    );
  }

  const updatedTrashMark = await TrashMark.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updatedTrashMark;
};

// Delete a trash mark (admin or owner can delete)
const deleteTrashMark = async (id, userId, userRole) => {
  const trashMark = await TrashMark.findById(id);
  if (!trashMark) throw new Error("Trash Mark not found");

  if (!isAdminOrOwner(userRole, userId, trashMark)) {
    throw new Error(
      "You can only delete your own trash mark or if you are an admin"
    );
  }

  await TrashMark.findByIdAndDelete(id);
  return { message: "Trash mark deleted" };
};

module.exports = {
  createTrashMark,
  getAllTrashMarks,
  getTrashMarkById,
  updateTrashMark,
  deleteTrashMark,
};
