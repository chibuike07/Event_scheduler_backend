const Joi = require("joi");

module.exports.eventValidator = Joi.object({
  title: Joi.string().trim().empty().required(),
  reminderDate: Joi.string().trim().empty().required(),
  reminderTime: Joi.string().trim().empty().required(),
  description: Joi.string().trim().empty().required(),
});
