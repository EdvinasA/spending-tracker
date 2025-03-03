import { CreateCategory, CreateCategorySchema } from '../model';
import {
    addItemToTable,
    TableName,
    validateRequestObject,
    verifyToken,
    TokenData
} from 'shared';
import { v4 as uuidv4 } from 'uuid';

export class CreateCategoryService {
    public createCategory = async (request: CreateCategory, token: string): Promise<void> => {
        await validateRequestObject(CreateCategorySchema, request);

        const userData = await verifyToken(token) as unknown as TokenData;

        await addItemToTable(TableName.CATEGORIES, {
            id: uuidv4(),
            name: request.name,
            email: userData.email,
            currency: request.currency,
            createdAt: new Date().toISOString(),
        });
    };
}
