import {Request, Response, NextFunction} from "express";
import {z} from "zod";
import {CategoryType, CategoryTypes} from "../enums/enum";
import {CategoryService} from "../shared/CategoryService";

export const categoryRequest = z.object({
    name: z.string(),
    description: z.string().optional(),
    type: z.string(),
    }
)

export const categoryUpdateRequest = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        type: z.enum(CategoryTypes).optional(),
        active: z.boolean().optional(),
    }
)

export function isCategoryType(type: string): type is CategoryType{
    return (CategoryTypes as readonly string[]).includes(type)
}

const categoryService = new CategoryService();

export async function createCategory(req: Request, res: Response, next: NextFunction){
    try{

        const body = categoryRequest.parse(req.body);
        const userId = Number(req.user?.id);

        if (!isCategoryType(body.type))
            throw new Error("Invalid category type");

        const category = await categoryService.createCategory({
            name: body.name,
            description: body.description,
            type: body.type,
            userId: userId
        })

        res.status(201).json({
            message: "Category created",
            id: category.id,
        })

    }catch (e) {
        next(e)
    }
}

export async function updateCategory(req: Request, res: Response, next: NextFunction){
    try{

        const body = categoryUpdateRequest.parse(req.body);
        const userId = Number(req.user?.id);

        const id = Number(req.params.id);

        if (!isCategoryType(<string>body.type))
            throw new Error("Invalid category type");

        const category = await categoryService.updateCategory(id, userId, body)

        res.status(201).json({
            message: "Category updated",
            changes: category.changes(body),
        })

    }catch (e) {
        next(e)
    }
}

export async function deleteCategory(req: Request, res: Response, next: NextFunction){
    try{

        const id = Number(req.params.id);

        await categoryService.deleteCategory(id)

        res.status(201).json({
            message: "Category deleted",
        })

    }catch (e) {
        next(e)
    }
}

export async function findAllCategories(req: Request, res: Response, next: NextFunction){
    try{

        const userId = Number(req.user?.id);

        const categories = await categoryService.getCategories(userId)

        const categoryData = categories.map(category => ({
            id: category.id,
            categoryType: category.type,
            categoryName: category.name,
            categoryDescription: category.description,
            isActive: category.active,
            createdAt: category.createdAt,
        }))

        res.status(201).json({
            categories: categoryData,
        })

    }catch (e) {
        next(e)
    }
}

export async function findCategory(req: Request, res: Response, next: NextFunction){
    try{

        const id = Number(req.params.id);

        const userId = Number(req.user?.id);

        const category = await categoryService.getCategory(id,userId)

        const data = {
            id: category.id,
            categoryName: category.name,
            categoryDescription: category.description,
            categoryType: category.type,
            isActive: category.active,
            createdAt: category.createdAt,
        }
        res.status(201).json({
            category: data,
        })

    }catch (e) {
        next(e)
    }
}