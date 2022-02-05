const { BAD_REQUEST } = require('../constants/statusCodes');

exports.validatorHandler = (schema, req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(BAD_REQUEST).json({
      status: 'error',
      message: error.details[0].message.replace(/[^a-zA-Z0-9]/g, ' '),
    });
  }
  next();
};
