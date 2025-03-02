import { Category } from "../model";
import { getByField, TableName, TokenData, verifyToken } from "shared";

export class GetCategoriesService {
    public getCategories = async (token: string): Promise<Category[]> => {
        const userData = await verifyToken(token) as unknown as TokenData;

        return await getByField<Category>(TableName.CATEGORIES, "email", userData.email);
    };
}
