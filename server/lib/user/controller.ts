import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';

export async function getUser(event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) {
  callback(null, { statusCode: 200, body: JSON.stringify({data: 'callback(null, { statusCode: 200, body: JSON.stringify(output) });'}) });
}