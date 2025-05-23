const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = () => {
  return (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null;

    if (token) {
      try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
      } catch (err) {
        console.warn('Invalid JWT token. Proceeding as guest.');
      }
    }

    next();
  };
};

module.exports = authMiddleware;
