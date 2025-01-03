import { Category } from "../model";
import { BadRequestExceptionMessage, getByField } from "shared";

export const getExpensesByEmail = async (email?: string): Promise<Category[]> => {
    if (!email) {
        throw new BadRequestExceptionMessage("Email is required");
    }

    const result = await getByField('Expenses', "email", email);

    if (!result || !result.Items || result.Items.length === 0) {
        return [];
    }
    return result.Items as Category[];
};