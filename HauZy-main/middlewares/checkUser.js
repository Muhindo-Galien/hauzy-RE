const User = require('../models/User');
const { BAD_REQUEST } = require('../constants/statusCodes');

exports.checkUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(BAD_REQUEST).json({
      status: 'error',
      message: `User with ${email} already exits.`,
    });
  }
  next();
};
