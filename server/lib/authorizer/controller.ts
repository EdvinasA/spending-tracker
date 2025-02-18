import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';
import { handleResult, handleError, verifyToken, getOneByField, TableName } from 'shared';
import { User } from 'user/model';

export async function handler(event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) {
  try {
    const token = event.headers?.Authorization?.split(' ')[1];
    if (!token) return handleResult(callback, { message: 'Access Denied' }, 401);

    const decoded = await verifyToken(token) as unknown as { email: string };
    console.log(token);
    const user = await getOneByField<User>(TableName.USERS, 'email', decoded.email);
    console.log(user);

    event.requestContext.authorizer = { user };

    return handleResult(callback, 'Validated', 200);
  } catch (error) {
    return handleError(callback, error);
  }
}
