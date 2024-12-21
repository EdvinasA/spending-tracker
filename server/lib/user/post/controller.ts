import { APIGatewayEvent, APIGatewayProxyCallback, Context } from "aws-lambda";
import { BadRequestException, handleResult, handleError } from "shared";
import { userValidationSchema } from "user/model";
import { saveUser } from "./service";

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