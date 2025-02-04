import { APIGatewayEvent, APIGatewayProxyCallback, Context } from "aws-lambda";
import { handleError, handleResult } from "shared";
import { CreateBalanceService } from "./service";
import { CreateBalanceRequest } from "balance/model";

export const handler = async (event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) => {
    try {
        const requestBody = JSON.parse(event.body || '{}');

        const service = new CreateBalanceService();

        await service.createBalance(requestBody as CreateBalanceRequest);

        return handleResult(callback, { message: `Balance entry saved successfully` }, 200);
    } catch (e) {
        return handleError(callback, e);
    }
};
