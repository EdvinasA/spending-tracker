import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';
import {getByEmail} from "../shared/database";

export async function getUser(event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) {
  const user = getByEmail('Users', '1');
  callback(null, { statusCode: 200, body: JSON.stringify({data: user}) });
}