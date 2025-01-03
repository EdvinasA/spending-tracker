import { APIGatewayEvent, APIGatewayProxyCallback, Context } from "aws-lambda";
import { handleError, handleResult } from "shared";
import { getExpensesByEmail } from "./service";

export const handler = async (event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) => {
    try {
        const email = event.pathParameters?.email;

        const expenses = await getExpensesByEmail(email);

        return handleResult(callback, { data: expenses }, 200);
    } catch (e) {
        return handleError(callback, e);
    }
};