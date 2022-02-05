const Joi = require('joi');
const { validatorHandler } = require('../middlewares/validatorHandler');

exports.registerValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    first_name: Joi.string().trim().alphanum().min(3).max(30).required(),
    last_name: Joi.string().trim().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(6)
      .regex(/[a-zA-Z0-9]{6,30}/)
      .required(),
    phone_number: Joi.string().min(10),
    address: Joi.string(),
    is_admin: Joi.bool(),
  });

  validatorHandler(schema, req, res, next);
};

exports.loginValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(6)
      .regex(/[a-zA-Z0-9]{6,30}/)
      .min(6)
      .required(),
  });

  validatorHandler(schema, req, res, next);
};
