import {APIGatewayEvent, APIGatewayProxyCallback, Context} from "aws-lambda";
import {expenseValidateSchema} from "./model";
import {handleError, handleResult} from "shared";
import {saveExpense} from "./service";


export const handler = async (event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) => {
    try {
        const requestBody = JSON.parse(event.body || '{}');

        const { error } = expenseValidateSchema.validate(requestBody);
        if (error) {
            return handleError(callback, new Error(`Validation error: ${error.details[0].message}`));
        }

        const { name, email, currency } = requestBody;

        await saveExpense(name, email, currency);

        return handleResult(callback, { message: `Expense saved successfully` }, 200);
    } catch (e) {
        return handleError(callback, e);
    }
};