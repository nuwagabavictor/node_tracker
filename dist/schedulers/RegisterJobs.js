"use strict";
// infrastructure/jobs/RegisterJobs.ts
Object.defineProperty(exports, "__esModule", { value: true });
const ActivityJobRunner_1 = require("./ActivityJobRunner");
const runner = new ActivityJobRunner_1.ActivityJobRunner();
runner.dailyActivityJob();
runner.budgetActivityJob();
runner.expireBudgetJob();
//# sourceMappingURL=RegisterJobs.js.map