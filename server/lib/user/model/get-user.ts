import Joi from 'joi';

export const getUserValidationSchema = Joi.object({
    email: Joi.string().email().required(),
});
