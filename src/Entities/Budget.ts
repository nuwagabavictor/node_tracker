import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique
} from "typeorm";
import {Category} from "./Category";
import {User} from "./User";
import {BudgetPeriod} from "../enums/enum";

@Entity({ name: "m_budget" })
@Unique(["userId", "categoryId", "startDate", "endDate"])
export class Budget extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "budget_amount", type: "decimal", precision: 15, scale: 2 })
    amount!: number;

    @ManyToOne(() => Category, { nullable: false })
    @JoinColumn({ name: "category_id" })
    category!: Category;

    @Column({ name: "category_id" })
    categoryId!: number;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "user_id" })
    user!: User;

    @Column({ name: "user_id" })
    userId!: number;

    @Column({ name: "active" })
    active!: boolean;

    @Column({type: "enum", enum: BudgetPeriod, default:BudgetPeriod.WEEKLY})
    period!: BudgetPeriod;

    @Column({ type: "date" , name: "start_date"})
    startDate!: Date;

    @Column({ type: "date" , name: "end_date"})
    endDate!: Date;

    @Column({ name: "budget_exceeded", default: false})
    budgetExceeded!: boolean;

    @Column({ name: "user_notified", default: false})
    userNotified!: boolean;

    @Column({ name: "amount_spent", type: "decimal", precision: 15, scale: 2 })
    amountSpent!: number;

    @Column({ name: "amount_exceeded", type: "decimal", precision: 15, scale: 2 })
    exceededAmount!: number;

    @CreateDateColumn()
    createdAt!: Date;

    static createBudget(params: {
        amount: number;
        category: Category;
        period: BudgetPeriod;
    }): Budget {

        const budget = new Budget();

        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);

        const endDate = Budget.determineEndDate(startDate, params.period);

        budget.amount = params.amount;
        budget.category = params.category;
        budget.user = params.category.user;
        budget.userId = params.category.userId;
        budget.period = params.period;
        budget.startDate = startDate;
        budget.endDate = endDate;
        budget.active = true;

        return budget;
    }

    changes(params:{
        amount?: number,
        period?: BudgetPeriod

    }):Record<string, any>{
        const actualChanges: Record<string, any> ={}

        // const startDate = new Date();
        // startDate.setHours(0, 0, 0, 0);

        if (params.amount !== undefined && params.amount !== this.amount){
            this.amount = params.amount
            actualChanges.amount = params.amount
        }

        if (params.period !== undefined && params.period !== this.period){
            this.period = params.period;
            //this.startDate = startDate

            const newEndDate = Budget.determineEndDate(this.startDate, params.period);

            this.endDate = newEndDate;

            actualChanges.period = params.period;
            actualChanges.endDate = newEndDate;

        }

        return actualChanges
    }

    static determineEndDate(startDate: Date, period: BudgetPeriod): Date {

        const endDate = new Date(startDate);

        switch (period) {

            case BudgetPeriod.WEEKLY:
                endDate.setDate(endDate.getDate() + 6);
                break;

            case BudgetPeriod.MONTHLY:
                endDate.setMonth(endDate.getMonth() + 1);
                break;

            case BudgetPeriod.YEARLY:
                endDate.setFullYear(endDate.getFullYear() + 1);
                break;
        }

        return endDate;
    }

    recordTransaction(amount: number) {

        this.amountSpent = Number(this.amountSpent || 0) + amount;

        if (this.amountSpent > Number(this.amount)) {

            this.budgetExceeded = true;

            this.exceededAmount = this.amountSpent - Number(this.amount);

        } else {

            this.budgetExceeded = false;
            this.exceededAmount = 0;

        }

    }

    isActive(): boolean {

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const start = new Date(this.startDate);
        start.setHours(0, 0, 0, 0);

        const end = new Date(this.endDate);
        end.setHours(23, 59, 59, 999);

        return today >= start && today <= end;
    }

    activate(): void {
        this.active = true;
    }

    deactivate(): void {
        this.active = false;
    }

    refreshStatus(): void {
        this.active = this.isActive();
    }
}