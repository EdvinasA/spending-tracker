import Joi from 'joi';

export interface Balance {
    id: string;
    userId: string;
    category: string;
    amount: number;
    createdAt: string;
    note?: string | null;
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