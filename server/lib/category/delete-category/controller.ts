import { APIGatewayEvent, APIGatewayProxyCallback, Context } from "aws-lambda";
import { handleError, handleResult } from "shared";
import { DeleteCategoryService } from "./delete-category-service";
import { DeleteCategoryRequest } from "../model";


export const handler = async (event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) => {
    try {
        const categoryId = event.pathParameters?.categoryId;
        const email = event.queryStringParameters?.email;

        if (!categoryId || !email) {
            return handleError(callback, new Error("Missing categoryId or email"));
        }

        const requestBody: DeleteCategoryRequest = { categoryId, email };
        const service = new DeleteCategoryService();

        await service.deleteCategory(requestBody);

        return handleResult(callback, { message: "Category deleted successfully" }, 200);
    } catch (error) {
        return handleError(callback, error);
    }
};




