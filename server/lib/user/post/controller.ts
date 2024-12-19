import {APIGatewayEvent, APIGatewayProxyCallback, Context} from "aws-lambda";
import {postItem} from "../../shared/database";
import {saveUser} from "./service";
import {handleResult} from "../../shared/result-handler";
import {handleError} from "../../shared/error-handling";

export async function handler(event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) {
    try {
        // Get user data from request body
        const requestBody = JSON.parse(event.body || '{}');
        const email = requestBody.email;

        saveUser(email);

        return handleResult(callback, { message: "User saved" }, 200);
    } catch (e) {
        return handleError(callback, e);
    }
}