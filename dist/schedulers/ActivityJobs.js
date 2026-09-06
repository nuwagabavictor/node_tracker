"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityJobs = void 0;
const User_1 = require("../Entities/User");
const BusinessEventNotifierService_1 = require("../events/BusinessEventNotifierService");
const Transaction_1 = require("../Entities/Transaction");
const typeorm_1 = require("typeorm");
const GlobalConfiguration_1 = require("../Entities/GlobalConfiguration");
const GlobalConstants_1 = require("../constants/GlobalConstants");
const UserSkippedDayBusinessEvent_1 = require("../events/initiators/UserSkippedDayBusinessEvent");
const BudgetExceededBusinessEvent_1 = require("../events/initiators/BudgetExceededBusinessEvent");
const Budget_1 = require("../Entities/Budget");
class ActivityJobs {
    async findDailyActivityTransaction() {
        const users = await User_1.User.find({
            where: {
                enabled: true,
                deleted: false
            }
        });
        for (const user of users) {
            const config = await GlobalConfiguration_1.GlobalConfiguration.findOne({
                where: {
                    userId: user.id,
                    name: GlobalConstants_1.GlobalConstants.ENABLE_DAILY_EMAIL_REMAINDER
                }
            });
            if (!config || !config?.enabled)
                continue;
            const startOfYesterday = new Date();
            startOfYesterday.setDate(startOfYesterday.getDate() - 1);
            startOfYesterday.setHours(0, 0, 0, 0);
            const endOfYesterday = new Date(startOfYesterday);
            endOfYesterday.setHours(23, 59, 59, 999);
            const count = await Transaction_1.Transaction.count({
                where: {
                    userId: user.id,
                    transactionDate: (0, typeorm_1.Between)(startOfYesterday, endOfYesterday)
                }
            });
            const userData = {
                id: user.id,
                email: user.email,
                username: user.username,
            };
            if (count === 0) {
                // publish business event
                await BusinessEventNotifierService_1.businessEventNotifier.notifyPostBusinessEvent(new UserSkippedDayBusinessEvent_1.UserSkippedDayBusinessEvent(userData));
            }
        }
    }
    async findDailyBudgetExceededLimits() {
        const budgets = await Budget_1.Budget.find({
            where: {
                active: true,
                userNotified: false,
                budgetExceeded: true
            },
            relations: {
                category: true,
                user: true
            }
        });
        for (const budget of budgets) {
            const spent = await Transaction_1.Transaction
                .createQueryBuilder("transaction")
                .select("SUM(transaction.amount)", "total")
                .where("transaction.user_id = :userId", {
                userId: budget.userId
            })
                .andWhere("transaction.category_id = :categoryId", {
                categoryId: budget.categoryId
            })
                .andWhere("transaction.type = :type", {
                type: "EXPENSE"
            })
                .andWhere("transaction.transactionDate BETWEEN :start AND :end", {
                start: budget.startDate,
                end: budget.endDate
            })
                .getRawOne();
            const totalSpent = Number(spent?.total ?? 0);
            if (totalSpent > budget.amount) {
                budget.userNotified = true;
                await budget.save();
                await BusinessEventNotifierService_1.businessEventNotifier.notifyPostBusinessEvent(new BudgetExceededBusinessEvent_1.BudgetExceededBusinessEvent({
                    budget,
                    amountSpent: totalSpent,
                    exceededBy: totalSpent - budget.amount
                }));
            }
        }
    }
    async expireBudgets(active) {
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        const budgets = await Budget_1.Budget
            .createQueryBuilder("p")
            .where("p.active =:active", { active: active })
            .andWhere("p.end_date <= :endDate", { endDate: today })
            .getMany();
        for (const budget of budgets) {
            budget.deactivate();
            await budget.save();
        }
    }
}
exports.ActivityJobs = ActivityJobs;
//# sourceMappingURL=ActivityJobs.js.map