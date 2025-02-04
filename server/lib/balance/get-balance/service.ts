import { Balance } from "../model";
import { getByField, isValidString, TableName } from "shared";

export class GetBalanceService {
    public getBalance = async (email?: string): Promise<Balance[]> => {
        await isValidString(email);

        return await getByField<Balance>(TableName.BALANCE, "category", email!);
    };
}

