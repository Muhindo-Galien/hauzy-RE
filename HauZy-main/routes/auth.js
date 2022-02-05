const {
  register,
  login,
  forgotpassword,
  resetpassword,
} = require('../controllers/auth');
const { loginValidator, registerValidator } = require('../validators/auth');
const { checkUser } = require('../middlewares/checkUser');

const express = require('express');
const router = express.Router();

router.route('/register').post(checkUser, registerValidator, register);
router.route('/login').post(loginValidator, login);
router.post('/forgotpassword', forgotpassword);
router.post('/resetpassword', resetpassword);

module.exports = router;
