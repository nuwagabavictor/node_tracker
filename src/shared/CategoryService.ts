import {CategoryType} from "../enums/enum";
import {Category} from "../Entities/Category";
import {User} from "../Entities/User";
import {businessEventNotifier} from "../events/BusinessEventNotifierService";
import {CategoryCreatedBusinessEvent} from "../events/initiators/CategoryCreatedBusinessEvent";

export type categoryData={
    name: string,
    description?: string,
    type: CategoryType,
    userId: number
}

export type updateCategoryData={
    name?: string,
    description?: string,
    type?: CategoryType,
    active?: boolean
}
export class CategoryService {

    async createCategory(data: categoryData): Promise<Category>{

        const user = await User.findOne({where: {id: data.userId}})

        if (!user) throw new Error("User not found")

        const category = await Category.findOne({where: {name: data.name}})

        if(category){
            throw new Error("Category already exists")
        }
        const newCategory = Category.createCategory({
            ...data,
            user: user
        })

        await newCategory.save();

        await businessEventNotifier.notifyPostBusinessEvent(
            new CategoryCreatedBusinessEvent(newCategory)
        )

        return newCategory
    }

    async updateCategory(id: number, userId: number, data: updateCategoryData): Promise<Category>{

        const category = await Category.findOne({where: {id: id}})

        if (!category) throw new Error("Category not found")

        const user = category.userId;

        if (user !== userId) throw new Error("You are not authorized to update this category")

        const changes = category.changes(data)


        if (Object.keys(changes).length > 0) {
            await Category.update(id, data)
        }
        return category
    }

    async getCategories(userId: number): Promise<Category[]>{
        return await Category.find({
            where: {
                userId: userId
            },
            relations:{
                user: true
            },
            order: {
                id: "DESC"
            }
        })
    }

    async getCategory(id: number, userId: number): Promise<Category>{
        const category = await Category.findOne({
            where:{
                id: id,
                userId: userId
            },
            relations:{
                user: true
            }
        })

        if (!category) throw new Error("Category not found")

        return category
    }

    async deleteCategory(id: number): Promise<void>{
        const category = await Category.findOne({where: {id: id}})

        if (!category) throw new Error("Category not found")

        await Category.delete(id)
    }
}