import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Category} from "./Category";
import {User} from "./User";
import {CategoryType, CategoryTypes} from "../enums/enum";

@Entity({ name: "m_transaction" })
export class Transaction extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "decimal", precision: 15, scale: 2, nullable: false  })
    amount!: number;

    @Column({ type: "enum", enum: CategoryTypes })
    type!: CategoryType;

    @Column({ length: 255, nullable: true })
    description?: string;

    @ManyToOne(() => Category, { nullable: false, onDelete:"CASCADE" })
    @JoinColumn({ name: "category_id" })
    category!: Category;

    @Column({ name: "category_id" })
    categoryId!: number;

    @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user!: User;

    @Column({ name: "user_id" })
    userId!: number;

    @Column({ type: "datetime" })
    transactionDate!: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    static createTransaction(params:{
        amount: number,
        category: Category,
        description?: string
    }):Transaction{

        const transaction = new Transaction();

        transaction.amount = params.amount;
        transaction.category = params.category;
        transaction.type = params.category.type;
        transaction.user = params.category.user;
        transaction.userId = params.category.userId;
        transaction.description = params.description;
        transaction.transactionDate = new Date();

        return transaction
    }

    changes(params:{
        amount: number,
        category: Category,
        description?: string
    }):Record<string, any>{
        const actualChanges: Record<string, any> ={}

        if (params.amount !== undefined && params.amount !== this.amount){
            this.amount = params.amount
            actualChanges.amount = params.amount
        }

        if (params.category !== undefined && params.category !== this.category){
            this.category = params.category
            actualChanges.category = params.category
        }

        if (params.description !== undefined && params.description !== this.description){
            this.description = params.description
            actualChanges.category = params.description
        }

        return actualChanges
    }
}