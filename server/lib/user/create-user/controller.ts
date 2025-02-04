import { APIGatewayEvent, APIGatewayProxyCallbackV2, Context } from "aws-lambda";
import { handleResult, handleError } from "shared";
import { SaveUserService } from "./save-user-service";
import { User, UserRegisterRequest } from "user/model";

export async function handler(event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallbackV2) {
    try {

        const requestBody = JSON.parse(event.body || '{}');
        const service = new SaveUserService();

        const user: UserRegisterRequest = requestBody;

        await service.save(user);

        return handleResult(callback, { message: "User saved" }, 200);
    } catch (e) {
        console.log(e);
        return handleError(callback, e);
    }
}