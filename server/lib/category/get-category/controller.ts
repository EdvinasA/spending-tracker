import { APIGatewayEvent, APIGatewayProxyCallback, Context } from "aws-lambda";
import { handleError, handleResult } from "shared";
import { GetCategoriesService } from "./get-category-service";

export const handler = async (event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) => {
    try {
        const token = event.headers?.authorization?.split(' ')[1];

        const service = new GetCategoriesService();

        const categories = await service.getCategories(token!);

        return handleResult(callback, categories, 200);
    } catch (e) {
        return handleError(callback, e);
    }
};
