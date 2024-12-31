import { Expense } from './model';
import { postItem } from 'shared';
import { v4 as uuidv4 } from 'uuid';

export const saveExpense = async (name: string, email: string, currency: string): Promise<void> => {
    const expense: Expense = {
        id: uuidv4(),
        name,
        email,
        currency,
        created_at: new Date().toISOString(),
    };

    await postItem('Expenses', expense);
};
