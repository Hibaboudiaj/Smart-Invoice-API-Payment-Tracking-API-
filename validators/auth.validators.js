const Joi = require("joi");
//joi:liberary f node.js katverfiy si7at lbayant li katji mn user

const registerSchema = Joi.object({
  
  name: Joi.string().required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(6).required(),
});

module.exports = {
    registerSchema,
}