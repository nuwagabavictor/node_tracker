import {Request, Response,NextFunction} from "express";
import {z} from "zod";
import {Category} from "../Entities/Category";
import {Transaction} from "../Entities/Transaction";
import {businessEventNotifier} from "../events/BusinessEventNotifierService";
import {TransactionCreatedBusinessEvent} from "../events/initiators/TransactionCreatedBusinessEvent";
import {Budget} from "../Entities/Budget";

export const transObj = z.object({
    categoryId: z.number(),
    amount: z.number(),
    description: z.string().optional(),
})

export async function createTransaction(req: Request, res: Response, next: NextFunction){

    try{

        const body = transObj.parse(req.body);

        const userId = Number(req.user?.id);

        const category = await Category.findOne({where: {id: body.categoryId, userId: userId}});

        if (!category) throw new Error("Category not found");

        if (!category.active) throw new Error("Category not active")


        if (body.amount <= 0) throw new Error("Amount must be greater than 0");

        const transaction =  Transaction.createTransaction({
            amount: body.amount,
            category: category,
            description: body.description
        })

        await transaction.save();

        const budget = await Budget.findOne({
            where: {
                userId: userId,
                categoryId: category.id,
                active: true
            }
        });

        if (budget) {

            budget.recordTransaction(transaction.amount);

            await budget.save();

        }

        await businessEventNotifier.notifyPostBusinessEvent(
            new TransactionCreatedBusinessEvent(transaction)
        )

        res.status(201).json(
            {
                message: "Transaction created",
                category: transaction.category.name,
                amount: transaction.amount,
            }
        )

    }catch (e) {
        next(e)
    }
}

export async function updateTransaction(req: Request, res: Response, next: NextFunction){

    try{

        const body = transObj.parse(req.body);

        const userId = Number(req.user?.id);

        const transId = Number(req.params.id);

        const transaction = await Transaction.findOne({where: {id: transId, userId: userId}});

        if (!transaction) throw new Error("Transaction not found");

        const category = await Category.findOne({where: {id: body.categoryId, userId: userId}});

        if (!category) throw new Error("Category not found");

        if (body.amount <= 0) throw new Error("Amount must be greater than 0");

        const changes =  transaction.changes({amount: body.amount, category: category, description: body.description})

        if (Object.keys(changes).length > 0) {
            await transaction.save();
        }

        res.status(201).json(
            {
                message: "Transaction updated",
                changes: changes,
            }
        )

    }catch (e) {
        next(e)
    }
}

export async function findAllTransaction(req: Request, res: Response, next: NextFunction){

    try{

        const userId = Number(req.user?.id);

        const transactions = await Transaction.find({
            where:{
                userId: userId
            },
            relations:{
                category: true,
                user: true,
            },
            order:{
                id: "DESC"
            }
        })

        const data = transactions.map(transaction => ({
            id: transaction.id,
            categoryName: transaction.category.name,
            categoryId: transaction.category.id,
            categoryType: transaction.category.type,
            transactionType: transaction.type,
            amount: transaction.amount,
            description: transaction.description,
            transactionDate: transaction.transactionDate,
            createdAt: transaction.createdAt,
        }))

        res.status(201).json(
            {
                transactions: data,
            }
        )

    }catch (e) {
        next(e)
    }
}

export async function findTransaction(req: Request, res: Response, next: NextFunction){

    try{

        const userId = Number(req.user?.id);

        const transId = Number(req.params.id);

        const transaction = await Transaction.findOne({
            where:{
                id: transId,
                userId: userId
            },
            relations:{
                category: true,
                user: true,
            },
            order:{
                id: "DESC"
            }
        })

        if (!transaction) throw new Error("Transaction not found");

        const data = {
            id: transaction.id,
            category: transaction.category.name,
            categoryId: transaction.category.id,
            categoryType: transaction.category.type,
            transactionType: transaction.type,
            amount: transaction.amount,
            description: transaction.description,
            transactionDate: transaction.transactionDate,
            createdAt: transaction.createdAt,
        }

        res.status(201).json(
            {
                transaction: data,
            }
        )

    }catch (e) {
        next(e)
    }
}