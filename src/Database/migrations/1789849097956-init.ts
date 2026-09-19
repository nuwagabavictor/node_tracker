import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1789849097956 implements MigrationInterface {
    name = 'Init1789849097956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`m_budget\` CHANGE \`amount_spent\` \`amount_spent\` decimal(15,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`m_budget\` CHANGE \`amount_exceeded\` \`amount_exceeded\` decimal(15,2) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`m_budget\` CHANGE \`amount_exceeded\` \`amount_exceeded\` decimal(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`m_budget\` CHANGE \`amount_spent\` \`amount_spent\` decimal(15,2) NOT NULL`);
    }

}
