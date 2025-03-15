import { Balance, GetBalanceQueryFilters } from "../model";
import { TokenData, verifyToken } from "shared";
import { GetBalanceRepository } from "./get-balance-repository";

export class GetBalanceService {
    private repository = new GetBalanceRepository();

    public getBalance = async (token: string, queryParams: GetBalanceQueryFilters): Promise<Balance[]> => {
        const userData = await verifyToken(token) as unknown as TokenData;
        
        return await this.repository.getBalance(userData.id, queryParams);
    };
}

