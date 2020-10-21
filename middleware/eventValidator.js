const Joi = require("joi");

module.exports.eventValidator = Joi.object({
  title: Joi.string().trim().required(),
  reminderDate: Joi.string().trim().required(),
  reminderTime: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  fullName: Joi.string().trim().required(),
});
