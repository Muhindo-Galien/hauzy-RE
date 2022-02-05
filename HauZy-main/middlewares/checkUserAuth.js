const { UNAUTHORIZED } = require('../constants/statusCodes');
const { decode } = require('../util/token');


exports.checkUserAuth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const token = authorization.split(' ')[1];

  if (!token) {
    return res.status(UNAUTHORIZED).json({
      status: 'failed',
      message: 'User not authorized.'
    });
  }
  decode(token, req, res, next);
};