import { Budget } from "../Entities/Budget";
export declare class BudgetRepository {
    checkOverlappingBudget(userId: number, categoryId: number, startDate: Date, endDate: Date, excludeBudgetId?: number): Promise<Budget | null>;
}
//# sourceMappingURL=BudgetRepository.d.ts.map