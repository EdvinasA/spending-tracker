import Joi from 'joi';

export type User = {
    id: string;
    email: string;
    createdAt: string;
}

export type UserRegisterRequest = {
    email: string;
}

export const UserRegisterRequestSchema: Joi.ObjectSchema<any> = Joi.object({
    email: Joi.string().email().required(),
});