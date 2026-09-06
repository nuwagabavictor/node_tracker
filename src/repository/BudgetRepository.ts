import {Budget} from "../Entities/Budget";

export class BudgetRepository {

    async checkOverlappingBudget(
        userId: number,
        categoryId: number,
        startDate: Date,
        endDate: Date,
        excludeBudgetId?: number
    ): Promise<Budget | null> {

        const query = Budget
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