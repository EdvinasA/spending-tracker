import { APIGatewayRequestAuthorizerEventV2, Context } from 'aws-lambda';
import { AuthorizerService } from './authorizer-service';

export async function handler(event: APIGatewayRequestAuthorizerEventV2, _: Context) {
  try {
    console.log(event);
    const token = event.headers?.authorization?.split(' ')[1];

    const authorizerService = new AuthorizerService();

    console.log(authorizerService.validateToken(token!));

    return { isAuthorized: authorizerService.validateToken(token!) }
  } catch (error) {
    throw new Error("Unauthorized")
  }
}
