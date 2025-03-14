import { QueryCommand, QueryCommandInput } from "@aws-sdk/lib-dynamodb";
import { BadRequestExceptionMessage, executeQuery, TableName } from "shared";
import { User } from "user/model";

export class LoginRepository {
    public async getUserByEmail(email: string): Promise<User> {
        const params: QueryCommandInput = {
            TableName: TableName.USERS,
            KeyConditions: {
                'email': {
                    AttributeValueList: [email],
                    ComparisonOperator: 'EQ'
                }
            }
        };

        const command = new QueryCommand(params);

        const response = await executeQuery<User>(command);

        if (response.length === 0) {
            throw new BadRequestExceptionMessage('User does not exist!')
        }

        return response[0];
    };
}