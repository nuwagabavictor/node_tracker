import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1788719742512 implements MigrationInterface {
    name = 'Init1788719742512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`m_budget\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`m_budget\` ADD \`budget_amount\` decimal(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`m_budget\` ADD \`budget_exceeded\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`m_budget\` ADD \`user_notified\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`m_budget\` ADD \`amount_spent\` decimal(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`m_budget\` ADD \`amount_exceeded\` decimal(15,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`m_budget\` DROP COLUMN \`amount_exceeded\``);
        await queryRunner.query(`ALTER TABLE \`m_budget\` DROP COLUMN \`amount_spent\``);
        await queryRunner.query(`ALTER TABLE \`m_budget\` DROP COLUMN \`user_notified\``);
        await queryRunner.query(`ALTER TABLE \`m_budget\` DROP COLUMN \`budget_exceeded\``);
        await queryRunner.query(`ALTER TABLE \`m_budget\` DROP COLUMN \`budget_amount\``);
        await queryRunner.query(`ALTER TABLE \`m_budget\` ADD \`amount\` decimal(15,2) NOT NULL`);
    }

}
