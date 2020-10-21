const Joi = require("joi");

module.exports.adminValidator = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
});
