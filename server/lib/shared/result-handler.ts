import { APIGatewayProxyCallback } from "aws-lambda";

export const handleResult = (callback: APIGatewayProxyCallback, result: any, statusCode: number) => {
    const responseBody = typeof result === "object" ? result : { message: result };

    callback(null, {
        statusCode,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(responseBody),
    });
};
