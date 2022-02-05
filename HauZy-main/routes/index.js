const router = require('express').Router();
const { NOT_FOUND, BAD_REQUEST } = require('../constants/statusCodes');

const authRouter = require('./auth');
const propertyRouter = require('./property');
const flagRouter = require('./flag');

router.use('/',(req,res,next) => {
  res.send('welcome to HauZy');
  next();
});
router.use('/auth', authRouter);
router.use('/property', propertyRouter);
router.use('/flag', flagRouter);

// catch all
router.all('*', (req, res) => {
  return res.status(NOT_FOUND).json({
    status: 'error',
    message: `${req.originalUrl} can't be found.`,
  });
});

router.use((err, req, res, next) => {
  res.status(BAD_REQUEST).json({
    status: 'error',
    statusCode: err.statusCode,
    message: err.message,
  });
  next();
});

module.exports = router;
