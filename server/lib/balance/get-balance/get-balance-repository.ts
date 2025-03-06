import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Balance, GetBalanceQueryFilters } from "balance/model";
import { executeScan } from "shared";

export class GetBalanceRepository {
    public async getBalance(userId: string, filters: GetBalanceQueryFilters): Promise<Balance[]> {
        const input = new ScanCommand({
            TableName: 'Balance',
            FilterExpression: 'userId = :userId AND createdAt > :startDate AND createdAt < :endDate',
            // FilterExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId,
                ':startDate': this.getStartOfTheDay(filters.date),
                ':endDate': this.getEndOfTheDay(filters.date),
            }
        })

        console.log(this.getStartOfTheDay(filters.date));
        console.log(this.getEndOfTheDay(filters.date));

        const response = await executeScan<Balance>(input);

        return response;
    }

    private getStartOfTheDay = (date: string) => {
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);
        return start.toISOString();
    }

    private getEndOfTheDay = (date: string) => {
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        return endOfDay.toISOString();
    }
}