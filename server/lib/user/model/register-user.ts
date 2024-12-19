import Joi from 'joi';

export const userValidationSchema = Joi.object({
    email: Joi.string().email().required(),
});