import { Balance } from "../model";
import { BadRequestExceptionMessage, getByField } from "shared";

export const getBalance = async (email?: string): Promise<Balance[]> => {
    if (!email) {
        throw new BadRequestExceptionMessage("Email is required");
    }

    const result = await getByField("Balance", "category", email);

    if (!result || !result.Items || result.Items.length === 0) {
        return [];
    }
    return result.Items as Balance[];
};
