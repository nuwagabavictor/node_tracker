"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1788719742512 = void 0;
class Init1788719742512 {
    name = 'Init1788719742512';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`m_budget\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`m_budget\` ADD \`budget_amount\` decimal(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`m_budget\` ADD \`budget_exceeded\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`m_budget\` ADD \`user_notified\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`m_budget\` ADD \`amount_spent\` decimal(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`m_budget\` ADD \`amount_exceeded\` decimal(15,2) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`m_budget\` DROP COLUMN \`amount_exceeded\``);
        await queryRunner.query(`ALTER TABLE \`m_budget\` DROP COLUMN \`amount_spent\``);
        await queryRunner.query(`ALTER TABLE \`m_budget\` DROP COLUMN \`user_notified\``);
        await queryRunner.query(`ALTER TABLE \`m_budget\` DROP COLUMN \`budget_exceeded\``);
        await queryRunner.query(`ALTER TABLE \`m_budget\` DROP COLUMN \`budget_amount\``);
        await queryRunner.query(`ALTER TABLE \`m_budget\` ADD \`amount\` decimal(15,2) NOT NULL`);
    }
}
exports.Init1788719742512 = Init1788719742512;
//# sourceMappingURL=1788719742512-init.js.map