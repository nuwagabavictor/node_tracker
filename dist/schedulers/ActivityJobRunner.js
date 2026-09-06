"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityJobRunner = void 0;
const ActivityJobs_1 = require("./ActivityJobs");
const node_cron_1 = __importDefault(require("node-cron"));
const job = new ActivityJobs_1.ActivityJobs();
class ActivityJobRunner {
    async dailyActivityJob() {
        node_cron_1.default.schedule("0 0 1 * *", async () => {
            console.log("Running daily activity check...");
            try {
                await job.findDailyActivityTransaction();
            }
            catch (error) {
                console.error("Daily activity job failed:", error);
            }
        });
    }
    async budgetActivityJob() {
        node_cron_1.default.schedule("0 0 1 * *", async () => {
            console.log("Running budget monitoring...");
            try {
                await job.findDailyBudgetExceededLimits();
            }
            catch (error) {
                console.error("Budget monitoring failed:", error);
            }
        });
    }
    async expireBudgetJob() {
        node_cron_1.default.schedule("0 0 2 * *", async () => {
            console.log("Running budget expiry monitoring...");
            try {
                await job.expireBudgets(true);
            }
            catch (error) {
                console.error("Budget expiry monitoring failed:", error);
            }
        });
    }
}
exports.ActivityJobRunner = ActivityJobRunner;
//# sourceMappingURL=ActivityJobRunner.js.map