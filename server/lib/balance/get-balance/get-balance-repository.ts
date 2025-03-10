import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Balance, GetBalanceQueryFilters } from "balance/model";
import { executeScan } from "shared";

export class GetBalanceRepository {
    public async getBalance(userId: string, filters: GetBalanceQueryFilters): Promise<Balance[]> {
        console.log('repository');
        const input = new ScanCommand({
            TableName: 'Balance',
            FilterExpression: 'userId = :userId AND createdAt = :date',
            ExpressionAttributeValues: {
                ':userId': userId,
                ':date': filters.date,      
            }
        })
        const response = await executeScan<Balance>(input);

        return response;
    }
}