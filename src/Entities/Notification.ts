import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "m_notification"})
export class Notification extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({name: "entity", length: 100})
    objectType!: string

    @Column({name: "entity_id"})
    objectId!: number

    @Column()
    action!: string

    @Column()
    message!: string

    @Column({name: "is_system_generated"})
    isSystemGenerated!: boolean

    @Column({name: "user_id"})
    userId!: number

    @CreateDateColumn()
    createdAt!: Date


    static createNotification(params:{
        objectId: number;
        objectType: string;
        action: string;
        message:string;
        userId:number
    }): Notification{

        const notification = new Notification()
        notification.objectId = params.objectId;
        notification.objectType = params.objectType;
        notification.action = params.action;
        notification.message = params.message;
        notification.userId = params.userId;
        notification.isSystemGenerated = true

        return notification

    }
}