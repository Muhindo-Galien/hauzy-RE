const { FORBIDDEN,UNAUTHORIZED } = require('../constants/statusCodes');
const jwt = require('jsonwebtoken');

exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token === null){
    res.status(UNAUTHORIZED).json({
      status: 'error',
      message: 'No access allowed.',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err,user) => {
    if(err){
      res.status(FORBIDDEN).json({
        status: 'error',
        message: 'Invalid token.',
      });
    }
    req.user= user;
    next();
  })
};
