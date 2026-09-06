import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn, Unique,
    UpdateDateColumn
} from "typeorm";
import {User} from "./User";

@Entity({name: "m_configuration"})
@Unique(["userId", "name"])
export class GlobalConfiguration extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({name: "config_name", nullable: false})
    name!: string

    @Column({name: "string_value", nullable: true})
    stringValue?: string

    @ManyToOne(() => User, {nullable: false, onDelete: "CASCADE"})
    @JoinColumn({ name: "user_id" })
    user!: User;

    @Column({ name: "user_id" })
    userId!: number;

    @Column({name: "is_enabled", default: false})
    enabled!: boolean

    @Column({name: "is_system_generated", default: true})
    systemGenerated!: boolean

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    static createConfig(params:{
        name: string,
        stringValue?: string,
        user: User,
    }): GlobalConfiguration{
        const config = new GlobalConfiguration();
        config.name = params.name;
        config.user = params.user;
        config.stringValue = params.stringValue;
        config.systemGenerated = true;
        config.enabled = true;

        return config
    }


    changes(data:{
        enabled? : boolean,
        stringValue?: string
    }): Record<string, any>{

        const actualChanges: Record<string, any> = {}

        if (data.enabled !== undefined && data.enabled !== this.enabled) {
            this.enabled = data.enabled
            actualChanges.enabled = this.enabled
        }

        if (data.stringValue !== undefined && data.stringValue !== this.stringValue) {
            this.stringValue = data.stringValue
            actualChanges.stringValue = this.stringValue
        }

        return Object.keys(actualChanges).length > 0 ? actualChanges : (
            {}
        )
    }
}