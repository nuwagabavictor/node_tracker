// infrastructure/jobs/RegisterJobs.ts

import { ActivityJobRunner } from "./ActivityJobRunner";

const runner = new ActivityJobRunner();

runner.dailyActivityJob();
runner.budgetActivityJob();
runner.expireBudgetJob();