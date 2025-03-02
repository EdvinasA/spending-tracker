import { APIGatewayEvent, APIGatewayProxyCallback, Context } from "aws-lambda";
import { handleError, handleResult, verifyToken } from "shared";
import { DeleteCategoryService } from "./delete-category-service";
import { DeleteCategoryRequest } from "../model";
import { TokenData } from "shared";

export const handler = async (event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) => {
    try {
        const categoryId = event.pathParameters?.categoryId ?? "";
        const token = event.headers?.authorization?.split(" ")[1];

        const userData = await verifyToken(token!) as unknown as TokenData;
        const requestBody: DeleteCategoryRequest = { categoryId, userId: userData.id };

        const service = new DeleteCategoryService();
        await service.deleteCategory(requestBody, token!);

        return handleResult(callback, { message: "Category deleted successfully" }, 200);
    } catch (error) {
        return handleError(callback, error);
    }
};
