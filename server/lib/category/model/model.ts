import Joi from 'joi';

export const CreateCategorySchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    currency: Joi.string().required()
});

export interface CreateCategory {
    name: string;
    email: string;
    currency: string;
}

export interface Category {
    id: string;
    name: string;
    email: string;
    currency: string;
    createdAt: string;
}