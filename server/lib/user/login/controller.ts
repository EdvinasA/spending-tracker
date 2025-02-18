import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';
import { handleResult, handleError } from 'shared';
import { LoginService } from './login-service';
import { LoginRequest } from 'user/model';

export async function handler(event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) {
  try {
    const requestBody = JSON.parse(event.body || '{}');

    const service = new LoginService();

    console.log(event);

    const token = await service.getSignedToken(requestBody as unknown as LoginRequest);

    console.log(token);

    return handleResult(callback, { token }, 200);
  } catch (error) {
    return handleError(callback, error);
  }
}
