"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const Category_1 = require("../Entities/Category");
const User_1 = require("../Entities/User");
const BusinessEventNotifierService_1 = require("../events/BusinessEventNotifierService");
const CategoryCreatedBusinessEvent_1 = require("../events/initiators/CategoryCreatedBusinessEvent");
class CategoryService {
    async createCategory(data) {
        const user = await User_1.User.findOne({ where: { id: data.userId } });
        if (!user)
            throw new Error("User not found");
        const category = await Category_1.Category.findOne({ where: { name: data.name } });
        if (category) {
            throw new Error("Category already exists");
        }
        const newCategory = Category_1.Category.createCategory({
            ...data,
            user: user
        });
        await newCategory.save();
        await BusinessEventNotifierService_1.businessEventNotifier.notifyPostBusinessEvent(new CategoryCreatedBusinessEvent_1.CategoryCreatedBusinessEvent(newCategory));
        return newCategory;
    }
    async updateCategory(id, userId, data) {
        const category = await Category_1.Category.findOne({ where: { id: id } });
        if (!category)
            throw new Error("Category not found");
        const user = category.userId;
        if (user !== userId)
            throw new Error("You are not authorized to update this category");
        const changes = category.changes(data);
        if (Object.keys(changes).length > 0) {
            await Category_1.Category.update(id, data);
        }
        return category;
    }
    async getCategories(userId) {
        return await Category_1.Category.find({
            where: {
                userId: userId
            },
            relations: {
                user: true
            },
            order: {
                id: "DESC"
            }
        });
    }
    async getCategory(id, userId) {
        const category = await Category_1.Category.findOne({
            where: {
                id: id,
                userId: userId
            },
            relations: {
                user: true
            }
        });
        if (!category)
            throw new Error("Category not found");
        return category;
    }
    async deleteCategory(id) {
        const category = await Category_1.Category.findOne({ where: { id: id } });
        if (!category)
            throw new Error("Category not found");
        await Category_1.Category.delete(id);
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=CategoryService.js.map