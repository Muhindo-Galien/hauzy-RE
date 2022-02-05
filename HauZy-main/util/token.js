const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../constants/statusCodes');
const logger = require('./logger');
const { JWT_SECRET_KEY } = require('./secrets');
const User = require('../models/User');

exports.generate = (id) => {
  return jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: '1d' });
};

exports.decode = (token, req, res, next) => {
  try {
    jwt.verify(token, JWT_SECRET_KEY, async (err, decoded) => {
      if (err || !decoded) {
        return res.status(UNAUTHORIZED).json({
          status: 'failed',
          message: 'User not authorized.'
        });
      }
      const { id } = decoded;
      const user = await User.findById(id);
      req.user = user;
    });
    next();
  } catch (error) {
    logger.error(error.message);
  }
};
