import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn, Unique,
    UpdateDateColumn
} from "typeorm";
import {CategoryType, CategoryTypes} from "../enums/enum";
import {User} from "./User";

@Entity({ name: "m_category" })
@Unique(["userId", "name"])
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "category_name", length: 100 , nullable: false})
    name!: string;

    @Column({ name: "category_type", type: "enum", enum:CategoryTypes })
    type!: CategoryType;

    @Column({ name: "category_description", nullable: true })
    description?: string;

    @Column({ default: true })
    active!: boolean;

    @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user!: User;

    @Column({ name: "user_id" })
    userId!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    static createCategory(params:{
        name: string,
        type: CategoryType,
        description?: string,
        user: User
    }): Category{
        const category = new Category();

        category.name = params.name;
        category.type = params.type;
        category.description = params.description;
        category.active = true
        category.user = params.user

        return category
    }

    changes(params:{

        name?: string,
        type?: CategoryType,
        description?: string,
        active?: boolean
    }): Record<string, any>{

        const actualChanges: Record<string, any> = {}

        if(params.name !== undefined && params.name !== this.name){
            this.name = params.name
            actualChanges.name = this.name
        }

        if(params.type !== undefined && params.type !== this.type){
            this.type = params.type
            actualChanges.type = this.type
        }

        if (params.active !== undefined && params.active !== this.active){
            this.active = params.active
            actualChanges.active = this.active
        }

        if (params.description !== undefined && params.description !== this.description){
            this.description = params.description
            actualChanges.description = this.description
        }

        return actualChanges
    }
}