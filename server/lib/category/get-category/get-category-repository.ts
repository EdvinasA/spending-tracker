import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { Category } from "category/model";
import { executeQuery, TableName } from "shared";

export class GetCategoryRepository {
    public async getCategory(userId: string): Promise<Category[]> {
        const input = new QueryCommand({
            TableName: TableName.CATEGORIES,
            KeyConditions: {
                'userId': {
                    AttributeValueList: [userId],
                    ComparisonOperator: 'EQ'
                }
            }
        })
        const response = await executeQuery<Category>(input);

        return response;
    }
}