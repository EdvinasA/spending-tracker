import { APIGatewayProxyCallback } from "aws-lambda";

export const handleResult = (callback: APIGatewayProxyCallback, data: any, statusCode: number) => {
    const responseBody = typeof data === "object" ? data : { data };

    callback(null, {
        statusCode,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(responseBody),
    });
};
