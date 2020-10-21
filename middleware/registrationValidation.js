const Joi = require("joi");

module.exports.SignUpValiddator = Joi.object({
  fullName: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().alphanum().required(),
  gender: Joi.string().trim().required(),
});

module.exports.SignInValidator = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().alphanum().required(),
});
