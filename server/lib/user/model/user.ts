import Joi from 'joi';

export type User = {
    id: string;
    email: string;
    password: string;
    createdAt: string;
};

export type UserRegisterRequest = {
    email: string;
    password: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export const LoginRequestRequestSchema: Joi.ObjectSchema<any> = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const UserRegisterRequestSchema: Joi.ObjectSchema<any> = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});