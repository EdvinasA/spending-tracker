import { Balance, CreateBalanceRequest, CreateBalanceRequestSchema } from "../model";
import {
    BadRequestExceptionMessage,
    addItemToTable,
    getOneByField,
    TableName,
    validateRequestObject
} from "shared";
import { v4 as uuidv4 } from "uuid";

export class CreateBalanceService {
    public createBalance = async (request: CreateBalanceRequest): Promise<void> => {
        await validateRequestObject(CreateBalanceRequestSchema, request)

        const categoryResult = await getOneByField(TableName.CATEGORIES, 'id', request.category);

        if (!categoryResult) {
            throw new BadRequestExceptionMessage(`Category with id ${request.category} not found`);
        }

        await addItemToTable<Balance>(TableName.BALANCE, {
            id: uuidv4(),
            category: request.category,
            amount: request.amount,
            note: request.note || "",
            createdAt: new Date().toISOString(),
        })

    }
}
