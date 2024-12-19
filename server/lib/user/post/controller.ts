import {APIGatewayEvent, APIGatewayProxyCallback, Context} from "aws-lambda";
import {postItem} from "../../shared/database";
import {saveUser} from "./service";
import {handleResult} from "../../shared/result-handler";
import {handleError} from "../../shared/error-handling";
import {userValidationSchema} from "../model/register-user";

export async function handler(event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) {
    try {

        const requestBody = JSON.parse(event.body || '{}');

        // Validate request body
        const { error } = userValidationSchema.validate(requestBody);
        if (error) {
            return handleError(callback, new Error(`Validation error: ${error.details[0].message}`));
        }

        const email: string = requestBody.email;

        await saveUser(email);

        return handleResult(callback, { message: "User saved" }, 200);
    } catch (e) {
        return handleError(callback, e);
    }
}