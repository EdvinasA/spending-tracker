import { APIGatewayEvent, APIGatewayProxyCallback, Context } from "aws-lambda";
import { handleOptionsResult } from "shared";

export const handler = async (__: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) => {
    return handleOptionsResult(callback, 200);
};
