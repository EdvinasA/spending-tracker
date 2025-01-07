import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';
import { getByField, handleResult, handleError } from 'shared';

export async function handler(event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) {
  try {
    const pathParameters = event.pathParameters!.email;
    const user = await getByField('Users', 'email', pathParameters!);
    return handleResult(callback, user!.Items![0], 200);
  } catch (e) {
    return handleError(callback, e);
  }
}