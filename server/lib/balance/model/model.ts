import Joi from 'joi';

export interface Balance {
    id: string;
    category: string;
    amount: number;
    note?: string | null;
    createdAt: string;
}

export const CreateBalanceRequestSchema = Joi.object({
    category: Joi.string().required(),
    amount: Joi.number().required(),
    note: Joi.string().optional(),
});

export interface CreateBalanceRequest {
    category: string;
    amount: number;
    note?: string | null;
}