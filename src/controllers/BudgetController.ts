
import { Request, Response, NextFunction } from 'express';
import {z} from "zod";
import {BudgetPeriod} from "../enums/enum";
import {Category} from "../Entities/Category";
import {Budget} from "../Entities/Budget";
import {businessEventNotifier} from "../events/BusinessEventNotifierService";
import {BudgetCreatedBusinessEvent} from "../events/initiators/BudgetCreatedBusinessEvent";
import {BudgetRepository} from "../repository/BudgetRepository";

export const budgetRequest = z.object({
    amount: z.number(),
    period: z.enum(BudgetPeriod),
    categoryId: z.number(),
})
export const budgetRequestUpdate = z.object({
    amount: z.number(),
    period: z.enum(BudgetPeriod),
})

const budgetRepository = new BudgetRepository()


export async function createBudget(req: Request, res: Response, next: NextFunction) {

    try {

        const body = budgetRequest.parse(req.body);
        const userId = Number(req.user?.id);

        const category = await Category.findOne({where: {id: body.categoryId, userId: userId}})

        if (!category) throw new Error("Category not found");

        if (!category.active) throw new Error("Category is not active");

        if (body.amount <= 0) throw new Error("Amount must be greater than 0");


        const startDate = new Date();
        startDate.setHours(0,0,0,0)

        const endDate = Budget.determineEndDate(
            startDate,
            body.period
        );

        const overlappingBudget = await budgetRepository.checkOverlappingBudget(userId, body.categoryId, startDate, endDate)

        if (overlappingBudget) {
            throw new Error("An active budget already exists for this category during the selected period.");
        }

        const budget = Budget.createBudget({
            amount: body.amount,
            category: category,
            period: body.period
        });

        await budget.save();

        await businessEventNotifier.notifyPostBusinessEvent(
            new BudgetCreatedBusinessEvent(budget)
        )

        res.status(201).json({
            message: "Budget created"
        })

    }catch (e) {
        next(e)
    }
}

export async function updateBudget(req: Request, res: Response, next: NextFunction) {

    try {

        const data = budgetRequestUpdate.parse(req.body);
        const budgetId = Number(req.params.id);

        const userId = Number(req.user?.id);

        const existing = await Budget.findOne({
            where: {id: budgetId, userId: userId},
            relations: {category: true}
        })

        if (!existing) throw new Error("Budget not found");

        const category = existing.category;

        if (!category.active) throw new Error("Category is not active");

        const newEndDate = Budget.determineEndDate(
            existing.startDate,
            data.period
        );

        if (data.amount <= 0) throw new Error("Amount must be greater than 0");


        const overlappingBudget = await budgetRepository.checkOverlappingBudget(
                userId,
                existing.categoryId,
                existing.startDate,
                newEndDate,
                existing.id
            );

        if (overlappingBudget) {
            throw new Error(
                "An active budget already exists for this category during the selected period."
            );
        }

        const changes = existing.changes({amount: data.amount, period: data.period})

        if (Object.keys(changes).length > 0){
            await existing.save();
        }



        res.status(201).json({
            message: "Budget updated",
            changes: changes
        })

    }catch (e) {
        next(e)
    }
}

export async function findAllBudgets(req: Request, res: Response, next: NextFunction){
    try {
        const userId = Number(req.user?.id);

        const budgets = await Budget.find({
            where:{
                userId: userId
            },
            relations:{
                category: true
            },
            order:{
                id: "DESC"
            }
        })

        const data = budgets.map(budget =>({
            id: budget.id,
            amount: budget.amount,
            period: budget.period,
            amountSpent: budget.amountSpent,
            exceededAmount: budget.exceededAmount,
            categoryName: budget.category.name,
            categoryId: budget.category.id,
            categoryType: budget.category.type,
            startDate: budget.startDate,
            endDate: budget.endDate,
            createdAt: budget.createdAt,
            isActive: budget.active,
            isBudgetExceeded: budget.budgetExceeded

        }))

        res.status(201).json({
            budgets: data
        })

    }catch (e) {
        next(e)
    }
}

export async function findBudget(req: Request, res: Response, next: NextFunction){
    try {
        const budgetId = Number(req.params.id);

        const userId = Number(req.user?.id);


        const budget = await Budget.findOne({
            where:{id: budgetId, userId: userId}
        })

        if (!budget){
            throw new Error("Budget not found")
        }

        const data = {
            id: budget.id,
            amount: budget.amount,
            period: budget.period,
            amountSpent: budget.amountSpent,
            exceededAmount: budget.exceededAmount,
            categoryName: budget.category.name,
            categoryId: budget.category.id,
            categoryType: budget.category.type,
            startDate: budget.startDate,
            endDate: budget.endDate,
            createdAt: budget.createdAt,
            isActive: budget.active,
            isBudgetExceeded: budget.budgetExceeded
        }

        res.status(200).json({
            budget: data
        })
    }catch (e) {
        next(e)
    }
}
