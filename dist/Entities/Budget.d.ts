import { BaseEntity } from "typeorm";
import { Category } from "./Category";
import { User } from "./User";
import { BudgetPeriod } from "../enums/enum";
export declare class Budget extends BaseEntity {
    id: number;
    amount: number;
    category: Category;
    categoryId: number;
    user: User;
    userId: number;
    active: boolean;
    period: BudgetPeriod;
    startDate: Date;
    endDate: Date;
    budgetExceeded: boolean;
    userNotified: boolean;
    amountSpent: number;
    exceededAmount: number;
    createdAt: Date;
    static createBudget(params: {
        amount: number;
        category: Category;
        period: BudgetPeriod;
    }): Budget;
    changes(params: {
        amount?: number;
        period?: BudgetPeriod;
    }): Record<string, any>;
    static determineEndDate(startDate: Date, period: BudgetPeriod): Date;
    recordTransaction(amount: number): void;
    isActive(): boolean;
    activate(): void;
    deactivate(): void;
    refreshStatus(): void;
}
//# sourceMappingURL=Budget.d.ts.map