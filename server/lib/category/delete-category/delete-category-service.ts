import { DeleteCategoryRequest, DeleteCategorySchema } from "../model";
import {
    deleteItem,
    TableName, TokenData,
    validateRequestObject, verifyToken
} from "shared";

export class DeleteCategoryService {
    public async deleteCategory(request: DeleteCategoryRequest, token: string): Promise<void> {
        await validateRequestObject(DeleteCategorySchema, request);

        const userData = await verifyToken(token) as unknown as TokenData;

        await deleteItem(TableName.CATEGORIES, request.categoryId, userData.email);
    }
}
