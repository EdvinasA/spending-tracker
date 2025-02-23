import { APIGatewayRequestAuthorizerEventV2, Context } from 'aws-lambda';
import { AuthorizerService } from './authorizer-service';

export async function handler(event: APIGatewayRequestAuthorizerEventV2, _: Context) {
  try {
    const token = event.headers?.authorization?.split(' ')[1];

    const authorizerService = new AuthorizerService();

    return { isAuthorized: authorizerService.validateToken(token!) }
  } catch (error) {
    throw new Error("Unauthorized")
  }
}
