import {ActivityJobs} from "./ActivityJobs";
import cron from "node-cron";


const job = new ActivityJobs()

export class ActivityJobRunner {

    async dailyActivityJob() {
        cron.schedule("0 0 1 * *", async () => {

            console.log("Running daily activity check...");

            try {
                await job.findDailyActivityTransaction();
            } catch (error) {
                console.error("Daily activity job failed:", error);
            }

        });
    }

    async budgetActivityJob() {
        cron.schedule("0 0 1 * *", async () => {

            console.log("Running budget monitoring...");

            try {
                await job.findDailyBudgetExceededLimits();
            } catch (error) {
                console.error("Budget monitoring failed:", error);
            }

        });
    }

    async expireBudgetJob() {
        cron.schedule("0 0 2 * *", async () => {

            console.log("Running budget expiry monitoring...");

            try {
                await job.expireBudgets(true);
            } catch (error) {
                console.error("Budget expiry monitoring failed:", error);
            }

        });
    }
}