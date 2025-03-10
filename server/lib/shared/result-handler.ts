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

export const handleOptionsResult = (callback: APIGatewayProxyCallback, statusCode: number) => {
    callback(null, {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: ""
    });
};
