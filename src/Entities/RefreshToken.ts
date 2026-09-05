import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";

import { User } from "./User";


@Entity("refresh_tokens")
export class RefreshToken extends BaseEntity {


    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, {nullable:false, onDelete:"CASCADE"})
    @JoinColumn({name:"user_id"})
    user!: User;

    @Column({unique:true})
    tokenHash!: string;

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



    static createToken(params:{user:User, tokenHash:string, expiryDays:number}){

        const refresh = new RefreshToken();

        refresh.user = params.user;

        refresh.tokenHash = params.tokenHash;

        refresh.expiresAt = new Date(Date.now() + params.expiryDays * 24 * 60 * 60 * 1000);

        return refresh;
    }

}