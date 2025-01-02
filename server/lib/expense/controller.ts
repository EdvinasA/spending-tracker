import { APIGatewayEvent, APIGatewayProxyCallback, Context } from "aws-lambda";
import { handleError, handleResult } from "shared";
import { saveExpense } from "./service";
import { CreateExpense } from "./model";


export const handler = async (event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) => {
    try {
        const requestBody = JSON.parse(event.body || '{}');

        await saveExpense(requestBody as unknown as CreateExpense);

        return handleResult(callback, { message: `Expense saved successfully` }, 200);
    } catch (e) {
        return handleError(callback, e);
    }
};

