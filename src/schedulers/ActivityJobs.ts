import {User} from "../Entities/User";
import {businessEventNotifier} from "../events/BusinessEventNotifierService";
import {Transaction} from "../Entities/Transaction";
import {Between} from "typeorm";
import {GlobalConfiguration} from "../Entities/GlobalConfiguration";
import {GlobalConstants} from "../constants/GlobalConstants";
import {UserSkippedDayBusinessEvent} from "../events/initiators/UserSkippedDayBusinessEvent";
import {BudgetExceededBusinessEvent} from "../events/initiators/BudgetExceededBusinessEvent";
import {Budget} from "../Entities/Budget";

export class ActivityJobs {

    async findDailyActivityTransaction() {


        const users = await User.find({
            where: {
                enabled: true,
                deleted: false
            }
        });

        for (const user of users) {

            const config = await GlobalConfiguration.findOne({
                where: {
                    userId: user.id,
                    name: GlobalConstants.ENABLE_DAILY_EMAIL_REMAINDER
                }
            });

            if (!config || !config?.enabled) continue;


            const startOfYesterday = new Date();
            startOfYesterday.setDate(startOfYesterday.getDate() - 1);
            startOfYesterday.setHours(0, 0, 0, 0);

            const endOfYesterday = new Date(startOfYesterday);
            endOfYesterday.setHours(23, 59, 59, 999);

            const count = await Transaction.count({
                where: {
                    userId: user.id,
                    transactionDate: Between(
                        startOfYesterday,
                        endOfYesterday
                    )
                }
            });

            const userData ={
                id: user.id,
                email: user.email,
                username: user.username,
            }

            if (count === 0) {

                // publish business event
                await businessEventNotifier.notifyPostBusinessEvent(
                    new UserSkippedDayBusinessEvent(userData),
                );
            }
        }
    }

    async findDailyBudgetExceededLimits() {

        const budgets = await Budget.find({
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

            const spent = await Transaction
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
                .andWhere(
                    "transaction.transactionDate BETWEEN :start AND :end",
                    {
                        start: budget.startDate,
                        end: budget.endDate
                    }
                )
                .getRawOne();

            const totalSpent = Number(spent?.total ?? 0);

            if (totalSpent > budget.amount) {
                budget.userNotified = true
                await budget.save()

                await businessEventNotifier.notifyPostBusinessEvent(
                    new BudgetExceededBusinessEvent({
                        budget,
                        amountSpent: totalSpent,
                        exceededBy: totalSpent - budget.amount
                    })
                );
            }
        }
    }

    async expireBudgets(active:boolean){

        const today = new Date();
        today.setHours(23, 59, 59, 999);

        const budgets = await Budget
            .createQueryBuilder("p")
            .where("p.active =:active", { active: active})
            .andWhere("p.end_date <= :endDate", {endDate: today})
            .getMany()

        for (const budget of budgets){

            budget.deactivate();
            await budget.save();
        }
    }
}