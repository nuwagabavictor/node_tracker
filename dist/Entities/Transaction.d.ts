import { BaseEntity } from "typeorm";
import { Category } from "./Category";
import { User } from "./User";
import { CategoryType } from "../enums/enum";
export declare class Transaction extends BaseEntity {
    id: number;
    amount: number;
    type: CategoryType;
    description?: string;
    category: Category;
    categoryId: number;
    user: User;
    userId: number;
    transactionDate: Date;
    createdAt: Date;
    updatedAt: Date;
    static createTransaction(params: {
        amount: number;
        category: Category;
        description?: string;
    }): Transaction;
    changes(params: {
        amount: number;
        category: Category;
        description?: string;
    }): Record<string, any>;
}
//# sourceMappingURL=Transaction.d.ts.map