import { BaseEntity } from "typeorm";
import { CategoryType } from "../enums/enum";
import { User } from "./User";
export declare class Category extends BaseEntity {
    id: number;
    name: string;
    type: CategoryType;
    description?: string;
    active: boolean;
    user: User;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    static createCategory(params: {
        name: string;
        type: CategoryType;
        description?: string;
        user: User;
    }): Category;
    changes(params: {
        name?: string;
        type?: CategoryType;
        description?: string;
        active?: boolean;
    }): Record<string, any>;
}
//# sourceMappingURL=Category.d.ts.map