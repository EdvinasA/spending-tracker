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
    note: Joi.string().optional().allow('').allow(null),
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

export type DateFilterType = 'day' | 'month' | 'year';

export interface GetBalanceQueryFilters {
    date: string;
    view: DateFilterType;
    endDate?: string;
}