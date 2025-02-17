import { APIGatewayEvent, APIGatewayProxyCallback, Context } from "aws-lambda";
import { handleError, handleResult } from "shared";
import { DeleteCategoryRequest } from "../model";
import { DeleteCategoryService } from "./delete-category-service";


export const handler = async (event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) => {
    try {
        if (!event.body) {
            return handleError(callback, new Error("Missing request body"));
        }

        const requestBody: DeleteCategoryRequest = JSON.parse(event.body);
        const service = new DeleteCategoryService();

        await service.deleteCategory(requestBody);

        return handleResult(callback, { message: "Category deleted successfully" }, 200);
    } catch (error) {
        return handleError(callback, error);
    }
};
