import { APIGatewayAuthorizerCallback, APIGatewayRequestAuthorizerEventV2, Context } from 'aws-lambda';
import { generatePolicy, getOneByField, TableName, verifyToken } from 'shared';
import { User } from 'user/model';

export async function handler(event: APIGatewayRequestAuthorizerEventV2, _: Context) {
  try {

    console.log(event);
    const token = event.headers?.authorization?.split(' ')[1];

    const decoded = await verifyToken(token) as unknown as { email: string };

    const user = await getOneByField<User>(TableName.USERS, 'email', decoded.email);

    event.requestContext.domainName = user.email;

    return { isAuthorized: user ? true : false }
  } catch (error) {
    throw new Error("Unauthorized")
  }
}
