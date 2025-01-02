import { APIGatewayEvent, APIGatewayProxyCallback, Context } from "aws-lambda";
import {BadRequestExceptionMessage, handleError, handleResult} from "shared";
import {getExpensesByEmail, saveExpense} from "./service";
import {CreateExpense} from "./model";


export const handler = async (event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) => {
    try {
        const requestBody = JSON.parse(event.body || '{}');

        await saveExpense(requestBody as unknown as CreateExpense);

        return handleResult(callback, { message: `Expense saved successfully` }, 200);
    } catch (e) {
        return handleError(callback, e);
    }
};

export const getExpensesHandler = async (event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) => {
    try {
        const email = event.queryStringParameters?.email;
        if (!email) {
            throw new BadRequestExceptionMessage("Email is required");
        }

        const expenses = await getExpensesByEmail(email);

        return handleResult(callback, { data: expenses }, 200);
    } catch (e) {
        return handleError(callback, e);
    }
};