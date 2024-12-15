import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';
import { getByField } from "../shared/database";

export async function getUser(event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) {
  try {
    // First value is table name, second, field by which searching and third is value that needs to be found
    const user = await getByField('Users', 'email', 'asdas');
    callback(null, { statusCode: 200, body: JSON.stringify({ data: user }) });
  } catch (e) {
    console.log(e)
  }

  callback(null, { statusCode: 200, body: JSON.stringify({ data: '' }) });
}