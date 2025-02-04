import { Category } from "../model";
import { getByField, isValidString, TableName } from "shared";

export class GetCategoriesService {
    public getCategories = async (email?: string): Promise<Category[]> => {
        await isValidString(email);

        return await getByField<Category>(TableName.CATEGORIES, "email", email!);
    };

}