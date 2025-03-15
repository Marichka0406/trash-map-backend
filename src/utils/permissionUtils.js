const isAdminOrOwner = (userRole, userId, trashMark) => {
  return userRole === "admin" || trashMark.userId.toString() === userId;
};

module.exports = {
  isAdminOrOwner,
};
