import { APIGatewayAuthorizerCallback, APIGatewayRequestAuthorizerEventV2, Context } from 'aws-lambda';
import { generatePolicy } from 'shared';

export async function handler(event: APIGatewayRequestAuthorizerEventV2, _: Context) {
  try {

    console.log(event);
    // console.log(event.headers?.Authorization);
    // const token = event.headers?.authorization?.split(' ')[1];
    // if (!token) return handleResult(callback, { message: 'Access Denied' }, 401);

    // const decoded = await verifyToken(token) as unknown as { email: string };
    // console.log(token);
    // const user = await getOneByField<User>(TableName.USERS, 'email', decoded.email);
    // console.log(user);

    // event.requestContext.authorizer = { user };

    return { isAuthorized: true }
  } catch (error) {
    throw new Error("Unauthorized")
  }
}
