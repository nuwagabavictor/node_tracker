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
            categoryName: transaction.category.name,
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


export async function findTransactionSummary(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = Number(req.user?.id);

        const categoryId = req.query.category
            ? Number(req.query.category)
            : null;


        const today = new Date();

        const defaultStartDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        const formatDate = (date: Date): string => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");

            return `${year}-${month}-${day}`;
        };

        const startDate =
            (req.query.startDate as string | undefined) ??
            formatDate(defaultStartDate);

        const endDate =
            (req.query.endDate as string | undefined) ??
            formatDate(today);

        const query = Transaction.createQueryBuilder("t")
            .innerJoin("t.category", "category")
            .where("t.userId = :userId", { userId })
            .andWhere("t.type = :type", { type: "EXPENSE" });

        if (categoryId) {
            query.andWhere("t.categoryId = :categoryId", {
                categoryId,
            });
        }

        if (startDate) {
            query.andWhere("DATE(t.transactionDate) >= :startDate", {
                startDate,
            });
        }

        if (endDate) {
            query.andWhere("DATE(t.transactionDate) <= :endDate", {
                endDate,
            });
        }

        // -------------------------------------------------------------
        // CATEGORY PROVIDED -> SINGLE CATEGORY SUMMARY
        // -------------------------------------------------------------
        if (categoryId) {
            const result = await query
                .select("COALESCE(SUM(t.amount), 0)", "amountSpent")
                .addSelect("category.id", "categoryId")
                .addSelect("category.name", "categoryName")
                .groupBy("category.id")
                .addGroupBy("category.name")
                .getRawOne();

            return res.status(200).json({
                summary: {
                    categoryId,
                    categoryName: result?.categoryName ?? null,
                    amountSpent: Number(result?.amountSpent ?? 0),
                    startDate,
                    endDate,
                },
            });
        }

        // -------------------------------------------------------------
        // NO CATEGORY -> GROUP BY ALL CATEGORIES
        // -------------------------------------------------------------
        const grouped = await query
            .select("category.id", "categoryId")
            .addSelect("category.name", "categoryName")
            .addSelect("category.type", "categoryType")
            .addSelect("COALESCE(SUM(t.amount), 0)", "amountSpent")
            .groupBy("category.id")
            .addGroupBy("category.name")
            .addGroupBy("category.type")
            .orderBy("amountSpent", "DESC")
            .getRawMany();

        const totalSpent = grouped.reduce(
            (sum, item) => sum + Number(item.amountSpent),
            0
        );

        return res.status(200).json({
            summary: {
                totalSpent,
                startDate,
                endDate,
                categories: grouped.map((item) => ({
                    categoryId: Number(item.categoryId),
                    categoryName: item.categoryName,
                    categoryType: item.categoryType,
                    amountSpent: Number(item.amountSpent),
                })),
            },
        });
    } catch (e) {
        next(e);
    }
}