import { Category } from "../model";
import { TokenData, verifyToken } from "shared";
import { GetCategoryRepository } from "./get-category-repository";

export class GetCategoriesService {
    private getCategoryRepository = new GetCategoryRepository();

    public getCategories = async (token: string): Promise<Category[]> => {
        const userData = await verifyToken(token) as unknown as TokenData;

        return await this.getCategoryRepository.getCategories(userData.id);
    };
}
