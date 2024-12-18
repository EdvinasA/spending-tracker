import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';
import { getByField } from "../shared/database";
import { handleResult } from '../shared/result-handler';
import { handleError } from '../shared/error-handling';

export async function getUser(event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) {
  try {
    const user = await getByField('Users', 'email', 'asdas');
    return handleResult(callback, user, 200);
  } catch (e) {
    return handleError(callback, e);
  }
}