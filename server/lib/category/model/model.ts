import Joi from 'joi';

export const CreateCategorySchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    currency: Joi.string().required()
});

export const DeleteCategorySchema = Joi.object({
    categoryId: Joi.string().uuid().required(),
    userId: Joi.string().required()
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

export interface DeleteCategoryRequest {
    categoryId: string;
    userId: string;
}
