const Joi = require("joi");

const loanValidation = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().min(21).max(65).required(),
  emptype: Joi.string().required(),
  income: Joi.number().required(),
  debt: Joi.number().required(),
  credit: Joi.number().min(650).required(),
  tenure: Joi.number().required(),
  loanTenure: Joi.number().required(),
  purpose: Joi.string().required(),
  amount: Joi.number().required(),
});

module.exports = loanValidation;