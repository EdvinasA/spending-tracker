import { APIGatewayRequestAuthorizerEventV2, Context } from 'aws-lambda';
import { getOneByField, TableName, verifyToken } from 'shared';
import { User } from 'user/model';

export async function handler(event: APIGatewayRequestAuthorizerEventV2, _: Context) {
  try {
    const token = event.headers?.authorization?.split(' ')[1];

    const decoded = await verifyToken(token) as unknown as { email: string };

    const user = await getOneByField<User>(TableName.USERS, 'email', decoded.email);

    return { isAuthorized: user ? true : false }
  } catch (error) {
    throw new Error("Unauthorized")
  }
}
