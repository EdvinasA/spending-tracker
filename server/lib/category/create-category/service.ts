import { CategorySchema, CreateCategory, Category } from '../model';
import {
    BadRequestException,
    BadRequestExceptionMessage,
    getByField,
    postItem
} from 'shared';
import { v4 as uuidv4 } from 'uuid';

export const createCategory = async (expense: CreateCategory): Promise<void> => {

    const { error } = CategorySchema.validate(expense);
    if (error) {
        throw new BadRequestException(error);
    }

    const user = await getByField('Users', 'email', expense.email);

    if (user.Count === 0) {
        throw new BadRequestExceptionMessage('User not found');
    }

    const categoryEntity: Category = {
        id: uuidv4(),
        name: expense.name,
        email: expense.email,
        currency: expense.currency,
        createdAt: new Date().toISOString(),
    };

    await postItem('Categories', categoryEntity);
};