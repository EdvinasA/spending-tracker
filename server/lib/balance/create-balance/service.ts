import { Balance, BalanceSchema, CreateBalance } from "../model";
import {
    BadRequestException,
    BadRequestExceptionMessage,
    getByField,
    postItem
} from "shared";
import { v4 as uuidv4 } from "uuid";


export const createBalance = async (balance: CreateBalance): Promise<void> => {

    const { error } = BalanceSchema.validate(balance);
    if (error) {
        throw new BadRequestException(error);
    }

    const categoryResult = await getByField('Categories', 'id', balance.category);

    if (!categoryResult || categoryResult.Count === 0 || !categoryResult.Items) {
        throw new BadRequestExceptionMessage('Category not found');
    }

    // const category = categoryResult.Items[0];

    const balanceEntity: Balance = {
        id: uuidv4(),
        category: balance.category,
        amount: balance.amount,
        note: balance.note || "",
        createdAt: new Date().toISOString(),
    };

    await postItem('Balance', balanceEntity)

}