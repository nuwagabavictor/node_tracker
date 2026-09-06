"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryUpdateRequest = exports.categoryRequest = void 0;
exports.isCategoryType = isCategoryType;
exports.createCategory = createCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
exports.findAllCategories = findAllCategories;
exports.findCategory = findCategory;
const zod_1 = require("zod");
const enum_1 = require("../enums/enum");
const CategoryService_1 = require("../shared/CategoryService");
exports.categoryRequest = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    type: zod_1.z.string(),
});
exports.categoryUpdateRequest = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    type: zod_1.z.enum(enum_1.CategoryTypes).optional(),
    active: zod_1.z.boolean().optional(),
});
function isCategoryType(type) {
    return enum_1.CategoryTypes.includes(type);
}
const categoryService = new CategoryService_1.CategoryService();
async function createCategory(req, res, next) {
    try {
        const body = exports.categoryRequest.parse(req.body);
        const userId = Number(req.user?.id);
        if (!isCategoryType(body.type))
            throw new Error("Invalid category type");
        const category = await categoryService.createCategory({
            name: body.name,
            description: body.description,
            type: body.type,
            userId: userId
        });
        res.status(201).json({
            message: "Category created",
            id: category.id,
        });
    }
    catch (e) {
        next(e);
    }
}
async function updateCategory(req, res, next) {
    try {
        const body = exports.categoryUpdateRequest.parse(req.body);
        const userId = Number(req.user?.id);
        const id = Number(req.params.id);
        if (!isCategoryType(body.type))
            throw new Error("Invalid category type");
        const category = await categoryService.updateCategory(id, userId, body);
        res.status(201).json({
            message: "Category updated",
            changes: category.changes(body),
        });
    }
    catch (e) {
        next(e);
    }
}
async function deleteCategory(req, res, next) {
    try {
        const id = Number(req.params.id);
        await categoryService.deleteCategory(id);
        res.status(201).json({
            message: "Category deleted",
        });
    }
    catch (e) {
        next(e);
    }
}
async function findAllCategories(req, res, next) {
    try {
        const userId = Number(req.user?.id);
        const categories = await categoryService.getCategories(userId);
        const categoryData = categories.map(category => ({
            id: category.id,
            categoryType: category.type,
            categoryName: category.name,
            categoryDescription: category.description,
            isActive: category.active,
            createdAt: category.createdAt,
        }));
        res.status(201).json({
            categories: categoryData,
        });
    }
    catch (e) {
        next(e);
    }
}
async function findCategory(req, res, next) {
    try {
        const id = Number(req.params.id);
        const userId = Number(req.user?.id);
        const category = await categoryService.getCategory(id, userId);
        const data = {
            id: category.id,
            categoryName: category.name,
            categoryDescription: category.description,
            categoryType: category.type,
            isActive: category.active,
            createdAt: category.createdAt,
        };
        res.status(201).json({
            category: data,
        });
    }
    catch (e) {
        next(e);
    }
}
//# sourceMappingURL=CategoryController.js.map