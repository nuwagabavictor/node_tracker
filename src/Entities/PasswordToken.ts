import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {User} from "./User";

@Entity("m_password_token")
export class PasswordToken extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!:number;

    @ManyToOne(() => User, {nullable:false, onDelete:"CASCADE"})
    @JoinColumn({name:"user_id"})
    user!: User;

    @Column({ name: 'user_id' })
    @Index()
    userId!: number;

    @Column({unique:true})
    otpHash!: string;

    @Column({default:false})
    revoked!: boolean;

    @Column({type:"datetime"})
    expiresAt!: Date;

    @CreateDateColumn()
    createdAt!: Date;




    isExpired():boolean{
        return new Date() > this.expiresAt;
    }


    isValid():boolean{
        return !this.revoked && !this.isExpired();
    }

    markUsed(){
        this.revoked = true;
    }

    static createPasswordToken(params:{user:User, tokenHash:string, expiryMinutes:number}){
        const token = new PasswordToken();
        token.user = params.user;
        token.otpHash = params.tokenHash;
        token.revoked = false;
        token.expiresAt = new Date(Date.now() + params.expiryMinutes * 60 * 1000);
        return token;
    }
}