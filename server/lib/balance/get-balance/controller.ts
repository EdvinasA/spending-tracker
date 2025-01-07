import { APIGatewayEvent, APIGatewayProxyCallback, Context } from "aws-lambda";
import { handleError, handleResult } from "shared";
import { getBalance } from "./service";

export const handler = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback) => {
    try {
        const email = event.pathParameters?.email;

        const balance = await getBalance(email);

        return handleResult(callback, { data: balance }, 200);
    } catch (e) {
        return handleError(callback, e);
    }
}