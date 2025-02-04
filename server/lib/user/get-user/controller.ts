import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';
import { handleResult, handleError } from 'shared';
import { GetUserService } from './get-user-service';

export async function handler(event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) {
  try {
    const email = event.pathParameters?.email;

    const service = new GetUserService();
    const user = await service.getUser(email);

    return handleResult(callback, user, 200);
  } catch (error) {
    return handleError(callback, error);
  }
}
