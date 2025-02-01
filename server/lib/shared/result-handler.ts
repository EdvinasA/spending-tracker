import { APIGatewayProxyCallback } from "aws-lambda";

export const handleResult = (callback: APIGatewayProxyCallback, result: any, statusCode: number) => {
    callback(null, {
        statusCode: statusCode,
        body: result,
    });
}