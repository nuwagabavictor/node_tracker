import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn, Unique
} from "typeorm";
import {Notification} from "./Notification";
import {User} from "./User";

@Entity({name:"m_notification_mapper"})
@Unique(["userId", "notificationId"])
export class NotificationMapper extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!:number

    @ManyToOne(() =>Notification, {nullable: false, onDelete: "CASCADE"})
    @JoinColumn({name:"notification_id"})
    notification!: Notification

    @Column({name: "notification_id"})
    @Index()
    notificationId!: number

    @ManyToOne(() =>User, {nullable: false, onDelete: "CASCADE"})
    @JoinColumn({name:"user_id"})
    user!: User

    @Column({name: "user_id"})
    @Index()
    userId!: number

    @Column({name: "is_read", default: false})
    isRead!: boolean

    @CreateDateColumn()
    createdAt!: Date


    static createNotificationMapper(params:{
        notification: Notification;
        user: User
    }): NotificationMapper{
        const mapper = new NotificationMapper();

        mapper.notification = params.notification;
        mapper.user = params.user;
        mapper.isRead = false

        return mapper
    }



}