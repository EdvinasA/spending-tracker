import { APIGatewayEvent, APIGatewayProxyCallback, Context } from "aws-lambda";
import { saveUser } from "./service";
import { handleResult } from "../../shared/result-handler";
import { handleError } from "../../shared/error-handling";
import { userValidationSchema } from "../model/register-user";
import { BadRequestException } from "../../shared/exception";

export async function handler(event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) {
    try {

        const requestBody = JSON.parse(event.body || '{}');

        const { error } = await userValidationSchema.validateAsync(requestBody);
        if (error) {
            throw new BadRequestException(error)
        }

        const email: string = requestBody.email;

        await saveUser(email);

        return handleResult(callback, { message: "User saved" }, 200);
    } catch (e) {
        return handleError(callback, e);
    }
}