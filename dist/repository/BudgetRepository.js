"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetRepository = void 0;
const Budget_1 = require("../Entities/Budget");
class BudgetRepository {
    async checkOverlappingBudget(userId, categoryId, startDate, endDate, excludeBudgetId) {
        const query = Budget_1.Budget
            .createQueryBuilder("b")
            .where("b.userId = :userId", { userId })
            .andWhere("b.categoryId = :categoryId", { categoryId })
            .andWhere("b.active = :active", { active: true })
            .andWhere("b.startDate <= :endDate", { endDate })
            .andWhere("b.endDate >= :startDate", { startDate });
        if (excludeBudgetId !== undefined) {
            query.andWhere("b.id != :id", {
                id: excludeBudgetId
            });
        }
        return await query.getOne();
    }
}
exports.BudgetRepository = BudgetRepository;
//# sourceMappingURL=BudgetRepository.js.map