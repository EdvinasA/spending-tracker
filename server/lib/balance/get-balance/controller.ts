import { APIGatewayEvent, APIGatewayProxyCallback, Context } from "aws-lambda";
import { handleError, handleResult } from "shared";
import { GetBalanceService } from "./get-balance-service";
import { GetBalanceQueryFilters } from "balance/model";

export const handler = async (event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) => {
    try {
        const token = event.headers?.authorization?.split(' ')[1];
        const queryParams = event.queryStringParameters || {};

        console.log(event);

        const service = new GetBalanceService();

        const balance = await service.getBalance(token!, queryParams as unknown as GetBalanceQueryFilters);

        return handleResult(callback, balance, 200);
    } catch (e) {
        return handleError(callback, e);
    }
}