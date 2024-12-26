import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';
import { getByField, handleResult, handleError } from 'shared';

export async function handler(event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) {
  try {
    const user = await getByField('Users', 'email', 'asdas');
    return handleResult(callback, user, 200);
  } catch (e) {
    return handleError(callback, e);
  }
}