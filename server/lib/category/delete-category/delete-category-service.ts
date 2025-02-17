import { Category, DeleteCategoryRequest, DeleteCategorySchema } from "../model";
import {
    BadRequestExceptionMessage, deleteItem,
    getOneByField,
    TableName,
    validateRequestObject
} from "shared";
import { User } from "user/model";

export class DeleteCategoryService {
    public async deleteCategory(request: DeleteCategoryRequest): Promise<void> {
        await validateRequestObject(DeleteCategorySchema, request);

        const user = await getOneByField<User>(TableName.USERS, 'email', request.email);
        if (!user) {
            throw new BadRequestExceptionMessage(`User with email ${request.email} not found`);
        }

        const category = await getOneByField<Category>(TableName.CATEGORIES, 'id', request.categoryId);
        if (!category) {
            throw new BadRequestExceptionMessage(`Category with id ${request.categoryId} not found`);
        }
        if (category.email !== request.email) {
            throw new BadRequestExceptionMessage(`Category does not belong to this user`);
        }

        await deleteItem(TableName.CATEGORIES, request.categoryId, request.email);
    }
}
