import Joi from 'joi';

export const expenseValidateSchema = Joi.object({
   name: Joi.string().required(),
   email: Joi.string().email().required(),
   currency: Joi.string().required()
});

export interface CreateExpense {
    name: string;
    email: string;
    currency: string;
}