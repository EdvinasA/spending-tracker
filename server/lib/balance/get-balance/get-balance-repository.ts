import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { Balance, GetBalanceQueryFilters } from "balance/model";
import { executeQuery, TableName } from "shared";

export class GetBalanceRepository {
    public async getBalance(userId: string, filters: GetBalanceQueryFilters): Promise<Balance[]> {
        const input = new QueryCommand({
            TableName: TableName.BALANCE,
            KeyConditions: {
                'userId': {
                    AttributeValueList: [userId],
                    ComparisonOperator: 'EQ'
                }
            },
            FilterExpression: 'createdAt = :date',
            ExpressionAttributeValues: {
                ':date': filters.date,
            }
        })
        const response = await executeQuery<Balance>(input);

        return response;
    }
}