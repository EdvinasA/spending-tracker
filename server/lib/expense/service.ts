import { CreateExpense, Expense, expenseValidateSchema } from './model';
import {
    BadRequestException,
    BadRequestExceptionMessage,
    getByField,
    postItem
} from 'shared';
import { v4 as uuidv4 } from 'uuid';

export const saveExpense = async (expense: CreateExpense): Promise<void> => {

    const { error } = expenseValidateSchema.validate(expense);
    if (error) {
        throw new BadRequestException(error);
    }

    const user = await getByField('Users', 'email', expense.email);

    if (user.Count === 0) {
        throw new BadRequestExceptionMessage('User not found');
    }

    const expenseObject: Expense = {
        id: uuidv4(),
        name: expense.name,
        email: expense.email,
        currency: expense.currency,
        createdAt: new Date().toISOString(),
    };

    await postItem('Expenses', expenseObject);
};