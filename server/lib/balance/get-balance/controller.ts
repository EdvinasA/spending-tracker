import { APIGatewayEvent, APIGatewayProxyCallback, Context } from "aws-lambda";
import { handleError, handleResult } from "shared";
import { GetBalanceService } from "./get-balance-service";

export const handler = async (event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) => {
    try {
        const email = event.pathParameters?.email;

        const service = new GetBalanceService();

        const balance = await service.getBalance(email);

        return handleResult(callback, balance, 200);
    } catch (e) {
        return handleError(callback, e);
    }
}