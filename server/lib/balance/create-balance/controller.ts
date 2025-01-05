import { APIGatewayEvent, APIGatewayProxyCallback, Context } from "aws-lambda";
import { CreateBalance } from "balance/model";
import { handleError, handleResult } from "shared";
import { createBalance } from "./service";

export const handler = async (event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) => {
    try {
        const requestBody = JSON.parse(event.body || '{}');

        await createBalance(requestBody as CreateBalance);

        return handleResult(callback, { message: `Balance entry saved successfully` }, 200);
    } catch (e) {
        return handleError(callback, e);
    }
};
