import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1788641643984 implements MigrationInterface {
    name = 'Init1788641643984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`m_notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`entity\` varchar(100) NOT NULL, \`entity_id\` int NOT NULL, \`action\` varchar(255) NOT NULL, \`message\` varchar(255) NOT NULL, \`is_system_generated\` tinyint NOT NULL, \`user_id\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`:notification_mapper\` (\`id\` int NOT NULL AUTO_INCREMENT, \`notification_id\` int NOT NULL, \`user_id\` int NOT NULL, \`is_read\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX \`IDX_dc856a64b5ac0fede0f44a76ab\` (\`notification_id\`), INDEX \`IDX_9058f76066abb41eb7c9ec6c03\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`:notification_mapper\` ADD CONSTRAINT \`FK_dc856a64b5ac0fede0f44a76abf\` FOREIGN KEY (\`notification_id\`) REFERENCES \`m_notification\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`:notification_mapper\` ADD CONSTRAINT \`FK_9058f76066abb41eb7c9ec6c030\` FOREIGN KEY (\`user_id\`) REFERENCES \`m_user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`:notification_mapper\` DROP FOREIGN KEY \`FK_9058f76066abb41eb7c9ec6c030\``);
        await queryRunner.query(`ALTER TABLE \`:notification_mapper\` DROP FOREIGN KEY \`FK_dc856a64b5ac0fede0f44a76abf\``);
        await queryRunner.query(`DROP INDEX \`IDX_9058f76066abb41eb7c9ec6c03\` ON \`:notification_mapper\``);
        await queryRunner.query(`DROP INDEX \`IDX_dc856a64b5ac0fede0f44a76ab\` ON \`:notification_mapper\``);
        await queryRunner.query(`DROP TABLE \`:notification_mapper\``);
        await queryRunner.query(`DROP TABLE \`m_notification\``);
    }

}
