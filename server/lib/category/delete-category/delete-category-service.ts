import { DeleteCategoryRequest, DeleteCategorySchema } from "../model";
import {
    deleteItem,
    TableName,
    validateRequestObject
} from "shared";

export class DeleteCategoryService {
    public async deleteCategory(request: DeleteCategoryRequest): Promise<void> {
        await validateRequestObject(DeleteCategorySchema, request);
        await deleteItem(TableName.CATEGORIES, request.categoryId, request.email);
    }
}
