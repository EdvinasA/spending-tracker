import { Balance, DateFilterType, GetBalanceQueryFilters } from "../model";
import { TokenData, verifyToken } from "shared";
import { GetBalanceRepository } from "./get-balance-repository";
import dayjs from 'dayjs';

export class GetBalanceService {
    private repository = new GetBalanceRepository();

    private getDateRange = (date: string, view: DateFilterType): { startDate: string; endDate: string } => {
        const dateObj = dayjs(date);
        
        switch (view) {
            case 'month':
                return {
                    startDate: dateObj.startOf('month').format('YYYY-MM-DD'),
                    endDate: dateObj.endOf('month').format('YYYY-MM-DD')
                };
            case 'year':
                return {
                    startDate: dateObj.startOf('year').format('YYYY-MM-DD'),
                    endDate: dateObj.endOf('year').format('YYYY-MM-DD')
                };
            default:
                return {
                    startDate: date,
                    endDate: date
                };
        }
    };

    public getBalance = async (token: string, queryParams: GetBalanceQueryFilters): Promise<Balance[]> => {
        const userData = await verifyToken(token) as unknown as TokenData;
        
        const { startDate, endDate } = this.getDateRange(queryParams.date, queryParams.view as DateFilterType);
        
        return await this.repository.getBalance(
            userData.id, 
            {
                ...queryParams,
                date: startDate,
                endDate
            }
        );
    };
}

