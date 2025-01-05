import Joi from 'joi';

export const BalanceSchema = Joi.object({
    category: Joi.string().required(),
    amount: Joi.number().required(),
    note: Joi.string().optional(),
});

export interface CreateBalance {
    category: string;
    amount: number;
    note?: string | null;
}