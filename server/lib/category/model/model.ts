import { AmountType } from 'balance/model';
import Joi from 'joi';

export const CreateCategorySchema = Joi.object({
    name: Joi.string().required(),
    amountType: Joi.string().required()
});

export const DeleteCategorySchema = Joi.object({
    categoryId: Joi.string().uuid().required(),
    userId: Joi.string().required()
});


export interface CreateCategory {
    name: string;
    email: string;
    amountType: AmountType;
}

export interface Category {
    id: string;
    name: string;
    email: string;
    amountType: AmountType;
    createdAt: string;
}

export interface DeleteCategoryRequest {
    categoryId: string;
    userId: string;
}
