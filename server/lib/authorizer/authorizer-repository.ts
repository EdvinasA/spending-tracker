import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { User } from "user/model";
import { executeQuery, TableName } from "shared";

export class AuthorizerRepository {
    public async getUserByEmail(email: string): Promise<User | null> {
        const input = new QueryCommand({
            TableName: TableName.USERS,
            KeyConditions: {
                'email': {
                    AttributeValueList: [email],
                    ComparisonOperator: 'EQ'
                }
            }
        });
        
        const response = await executeQuery<User>(input);
        
        return response.length > 0 ? response[0] : null;
    }
} 