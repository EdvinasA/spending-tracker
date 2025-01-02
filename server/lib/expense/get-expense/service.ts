import {Expense} from "../model";
import { getByField} from "shared";

export const getExpensesByEmail = async (email: string): Promise<Expense[]> => {
    const result = await getByField('Expenses', "email", email);

    if (!result || !result.Items || result.Items.length === 0) {
        return [];
    }
    return result.Items as Expense[];
};