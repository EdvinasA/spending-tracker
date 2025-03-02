import { APIGatewayEvent, APIGatewayProxyCallback, Context } from "aws-lambda";
import { CreateCategory } from "category/model";
import { handleError, handleResult } from "shared";
import { CreateCategoryService } from "./create-category-service";

export const handler = async (event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) => {
    try {
        const requestBody = JSON.parse(event.body || '{}');
        const token = event.headers?.authorization?.split(' ')[1];

        const service = new CreateCategoryService();
        await service.createCategory(requestBody as CreateCategory, token!);

        return handleResult(callback, { message: `Category saved successfully` }, 200);
    } catch (e) {
        return handleError(callback, e);
    }
};
