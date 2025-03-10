import Joi from 'joi';

export interface Balance {
    id: string;
    userId: string;
    category: string;
    amount: number;
    createdAt: string;
    type: AmountType;
    note?: string | null;
}

export const CreateBalanceRequestSchema = Joi.object({
    category: Joi.string().required(),
    amount: Joi.number().required(),
    type: Joi.string().required(),
    createdAt: Joi.string().isoDate().required(),
    note: Joi.string().allow(null).optional()
});

export interface CreateBalanceRequest {
    category: string;
    amount: number;
    type: AmountType;
    createdAt: string;
    note?: string | null;
}

export enum AmountType {
    INCOME = "INCOME",
    EXPENSE = "EXPENSE"
}

export interface GetBalanceQueryFilters {
    date: string;
}