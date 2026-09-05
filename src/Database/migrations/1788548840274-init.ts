import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1788548840274 implements MigrationInterface {
    name = 'Init1788548840274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`m_user\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`m_user\` CHANGE \`phone\` \`phone\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`m_user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`m_user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`m_user\` CHANGE \`phone\` \`phone\` varchar(255) NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`m_user\` CHANGE \`email\` \`email\` varchar(255) NOT NULL DEFAULT '1'`);
    }

}
