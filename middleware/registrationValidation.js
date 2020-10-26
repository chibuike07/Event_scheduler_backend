const Joi = require("joi");

module.exports.SignUpValiddator = Joi.object({
  fullName: Joi.string().trim().empty().required(),
  email: Joi.string().trim().empty().email().required(),
  password: Joi.string().trim().empty().min(8).max(300).alphanum().required(),
  gender: Joi.string().trim().empty().required(),
});

module.exports.SignInValidator = Joi.object({
  email: Joi.string().trim().empty().email().required(),
  password: Joi.string().trim().empty().min(8).alphanum().required(),
});
