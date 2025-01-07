import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';
import { handleResult, handleError, BadRequestExceptionMessage } from 'shared';
import { getUser} from './service';

export async function handler(event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) {
  try {
    const email = event.pathParameters?.email;

    if (!email) {
      throw new BadRequestExceptionMessage('Email is required');
    }

    const user = await getUser(email);

    return handleResult(callback, user, 200);
  } catch (error) {
    return handleError(callback, error);
  }
}
