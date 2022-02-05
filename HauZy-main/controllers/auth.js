const bcrypt = require('bcrypt');
const User = require('../models/User');
const logger = require('../util/logger');
const tokenUtil = require('../util/token');
const {
  BAD_REQUEST,
  CREATED,
  NOT_FOUND,
  UNAUTHORIZED,
  OK,
} = require('../constants/statusCodes');

exports.register = async (req, res) => {
  const {
    first_name,
    last_name,
    phone_number,
    address,
    is_admin,
    email,
    password,
  } = req.body;
  const user = new User({
    first_name,
    last_name,
    phone_number,
    address,
    is_admin,
    email,
    password: bcrypt.hashSync(password, 10),
  });

  let saveUser;

  try {
    saveUser = await user.save();
  } catch (err) {
    logger.error(err.message);
  }

  if (!saveUser) {
    return res.status(BAD_REQUEST).json({
      status: 'error',
      message: 'Failed to create user!',
    });
  }
  const token = tokenUtil.generate(user._id);

  return res.status(CREATED).json({
    status: 'success',
    token,
    data: {
      first_name: saveUser.first_name,
      email: saveUser.email,
    },
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(NOT_FOUND).json({
        status: 'failed',
        message: 'User not found.',
      });
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = tokenUtil.generate(user._id);

      return res.status(OK).json({
        status: 'success',
        token,
        data: {
          first_name: user.first_name,
          email: user.email,
        },
      });
    }
    return res.status(UNAUTHORIZED).json({
      status: 'error',
      message: 'Wrong password.',
    });
  } catch (error) {
    logger.error(error.message);
  }
};
exports.forgotpassword = (req, res) => {
  res.send('Forgot Password Route');
};

exports.resetpassword = (req, res) => {
  res.send('Reset Password Route');
};
