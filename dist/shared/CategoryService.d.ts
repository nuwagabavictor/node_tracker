import { CategoryType } from "../enums/enum";
import { Category } from "../Entities/Category";
export type categoryData = {
    name: string;
    description?: string;
    type: CategoryType;
    userId: number;
};
export type updateCategoryData = {
    name?: string;
    description?: string;
    type?: CategoryType;
    active?: boolean;
};
export declare class CategoryService {
    createCategory(data: categoryData): Promise<Category>;
    updateCategory(id: number, userId: number, data: updateCategoryData): Promise<Category>;
    getCategories(userId: number): Promise<Category[]>;
    getCategory(id: number, userId: number): Promise<Category>;
    deleteCategory(id: number): Promise<void>;
}
//# sourceMappingURL=CategoryService.d.ts.map