import { CreateCategory, CreateCategorySchema } from '../model';
import {
    BadRequestExceptionMessage,
    addItemToTable,
    TableName,
    getOneByField,
    validateRequestObject
} from 'shared';
import { User } from 'user/model';
import { v4 as uuidv4 } from 'uuid';

export class CreateCategoryService {
    public createCategory = async (request: CreateCategory): Promise<void> => {
        await validateRequestObject(CreateCategorySchema, request)

        const user = await getOneByField<User>(TableName.USERS, 'email', request.email);

        if (user) {
            throw new BadRequestExceptionMessage(`User with email ${request.email} not found`);
        }

        await addItemToTable(TableName.CATEGORIES, {
            id: uuidv4(),
            name: request.name,
            email: request.email,
            currency: request.currency,
            createdAt: new Date().toISOString(),
        });
    };
}