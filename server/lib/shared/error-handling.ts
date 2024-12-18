import { APIGatewayProxyCallback } from 'aws-lambda';

export const handleError = (callback: APIGatewayProxyCallback, error: any) => {
    if (error.statusCode) {
        const errorResponse = {
            message: error.message === '' ? undefined : error.message,
            errors: error.validationErrors,
            requestId: global.traceIdForRequest,
        };

        callback(null, {
            statusCode: error.statusCode,
            body: JSON.stringify(errorResponse),
        });
        return;
    }
    // For handling unexpected errors
    // If use callback(error) we will get unwanted information,
    // therefoe manually setting unexpected error is better
    callback(null, {
        statusCode: 500,
        body: JSON.stringify({ error, requestId: global.traceIdForRequest }),
    });
}