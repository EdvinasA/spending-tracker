import { APIGatewayEvent, APIGatewayProxyCallbackV2, Context } from "aws-lambda";
import { handleResult, handleError } from "shared";
import { saveUser } from "./service";

export async function handler(event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallbackV2) {
    try {

        const requestBody = JSON.parse(event.body || '{}');

        const email: string = requestBody.email;

        await saveUser(email);

        return handleResult(callback, { message: "User saved" }, 200);
    } catch (e) {
        console.log(e);
        return handleError(callback, e);
    }
}