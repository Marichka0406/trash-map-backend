const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (role = 'user') => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      req.user = decoded;

      if (role && req.user.role !== role) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      next();
    } catch (err) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  };
};

module.exports = authMiddleware;
