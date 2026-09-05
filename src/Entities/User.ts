import {BaseEntity, Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

import { Roles, UserRole } from "../enums/enum";



@Entity({ name: "m_user" })
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    username!: string;

    @Column({ unique: true, nullable: false })
    email!: string;

    @Column({ nullable: false, unique: true })
    phone!: string;

    @Column({ nullable: false })
    password!: string;

    @Column({ default: true })
    enabled!: boolean;

    @Column({ default: false })
    locked!: boolean;

    @Column({ default: false })
    deleted!: boolean;

    @Column({ default: false })
    twoFactorEnabled!: boolean;

    @Column({ default: true })
    accountNonExpired!: boolean;

    @Column({ default: true })
    accountNonLocked!: boolean;

    @Column({ default: true })
    credentialsNonExpired!: boolean;

    @Column({ default: true })
    firstTimeLogin!: boolean;

    @Column({ default: 0 })
    failedLoginAttempts!: number;

    @Column({name: 'lock_until', type: 'datetime', nullable: true})
    lockUntil?: Date;

    @Column({type: "enum", enum: Roles})
    role!: UserRole;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;


    // ==========================
    // FACTORY METHOD
    // ==========================

    static async fromJson(params:{ username:string; email:string; password:string; role:UserRole; phone:string }):Promise<User>{

        const user = new User();

        user.username = params.username;
        user.email = params.email;

        user.password = params.password;

        user.role = params.role;
        user.phone = params.phone;

        user.enabled = true;
        user.locked = false;
        user.deleted = false;

        user.twoFactorEnabled = false;

        user.accountNonExpired = true;
        user.credentialsNonExpired = true;

        user.firstTimeLogin = true;

        return user;
    }



    // ==========================
    // BUSINESS BEHAVIOURS
    // ==========================


    enable(){

        if(this.deleted){
            throw new Error(
                "Deleted user cannot be enabled"
            );
        }

        this.enabled = true;
    }



    disable(){
        this.enabled = false;
    }





    unlock(){

        this.locked = false;
        this.failedLoginAttempts = 0;
    }



    enableTwoFactor(){

        this.twoFactorEnabled = true;
    }



    disableTwoFactor(){
        this.twoFactorEnabled = false;
    }



    completeFirstLogin(){
        this.firstTimeLogin = false;
    }



    expireAccount(){
        this.accountNonExpired = false;
    }



    activateAccount(){
        this.accountNonExpired = true;
    }



    expireCredentials(){
        this.credentialsNonExpired = false;
    }



    changeRole(role:UserRole){
        this.role = role;
    }



    changePassword(newPassword:string){

        this.password =  newPassword;

        this.credentialsNonExpired = true;
    }



    delete(){

        this.deleted = true;
        this.enabled = false;
    }



    recordFailedLogin(maxAttempts: number, lockPeriodMinutes: number): void {

        // Already locked and lock period has not expired
        if (!this.accountNonLocked && this.locked && this.lockUntil && new Date() < this.lockUntil) {
            return;
        }


        // Reset lock if expired
        if (!this.accountNonLocked && this.locked && this.lockUntil && new Date() >= this.lockUntil) {
            this.accountNonLocked = true;
            this.lockUntil = undefined;
            this.failedLoginAttempts = 0;
            this.locked = false;
        }


        this.failedLoginAttempts++;


        if (this.failedLoginAttempts >= maxAttempts) {

            this.accountNonLocked = false;
            this.locked = true;

            this.lockUntil = new Date(Date.now() + lockPeriodMinutes * 60 * 1000);
        }
    }



    recordSuccessfulLogin(): void {

        this.failedLoginAttempts = 0;
        this.accountNonLocked = true;
        this.lockUntil = undefined;
        this.locked = false;

    }

     changes(data: {
        username?: string;
        email?: string;
        phone?: string;
    }): Record<string, unknown> {

        const actualChanges: Record<string, unknown> = {};

        if (data.username !== undefined && data.username !== this.username) {
            this.username = data.username;
            actualChanges.username = this.username;
        }

        if (data.email !== undefined && data.email !== this.email) {
            this.email = data.email;
            actualChanges.email = this.email;
        }

        if (data.phone !== undefined && data.phone !== this.phone) {
            this.phone = data.phone;
            actualChanges.phone = this.phone;
        }

        return actualChanges;
    }





    // ==========================
    // QUERIES
    // ==========================


    isAccountActive():boolean{

        return (this.enabled && !this.locked && !this.deleted && this.accountNonExpired && this.credentialsNonExpired);
    }



    canLogin():boolean{
        return this.isAccountActive();
    }



    hasTwoFactor():boolean{
        return this.twoFactorEnabled;
    }



    getUsername(){
        return this.username;
    }


    getPassword() {
        return this.password;
    }

    getEmail(){
        return this.email;
    }

    getId(){
        return this.id;
    }



    getRole(){
        return this.role;
    }


}