import { Balance } from "../model";
import { getByField, TableName, TokenData, verifyToken } from "shared";

export class GetBalanceService {
    public getBalance = async (token: string): Promise<Balance[]> => {
        const userData = await verifyToken(token) as unknown as TokenData;

        return await getByField<Balance>(TableName.BALANCE, "userId", userData.id);
    };
}

