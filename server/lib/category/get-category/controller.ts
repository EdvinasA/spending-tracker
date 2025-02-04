import { APIGatewayEvent, APIGatewayProxyCallback, Context } from "aws-lambda";
import { handleError, handleResult } from "shared";
import { GetCategoriesService } from "./get-categories-service";

export const handler = async (event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) => {
    try {
        const email = event.pathParameters?.email;

        const service = new GetCategoriesService();

        const expenses = await service.getCategories(email);

        return handleResult(callback, expenses, 200);
    } catch (e) {
        return handleError(callback, e);
    }
};