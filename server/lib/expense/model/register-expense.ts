import Joi from 'joi';

export const expenseValidateSchema = Joi.object({
   name: Joi.string().required(),
   email: Joi.string().email().required(),
   currency: Joi.string().required()
});