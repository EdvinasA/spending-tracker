import { APIGatewayEvent, APIGatewayProxyCallback, Context } from "aws-lambda";
import { CreateCategory } from "category/model";
import { handleError, handleResult } from "shared";
import { createCategory } from "./service";


export const handler = async (event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) => {
    try {
        const requestBody = JSON.parse(event.body || '{}');

        await createCategory(requestBody as unknown as CreateCategory);

        return handleResult(callback, { message: `Category saved successfully` }, 200);
    } catch (e) {
        return handleError(callback, e);
    }
};

