"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1788532378657 = void 0;
class Init1788532378657 {
    name = 'Init1788532378657';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`m_user\` ADD \`phone\` varchar(255) NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`m_user\` ADD UNIQUE INDEX \`IDX_efcf184b50a0d1fcc60fadcc2b\` (\`phone\`)`);
        await queryRunner.query(`ALTER TABLE \`m_user\` CHANGE \`email\` \`email\` varchar(255) NOT NULL DEFAULT 1`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`m_user\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`m_user\` DROP INDEX \`IDX_efcf184b50a0d1fcc60fadcc2b\``);
        await queryRunner.query(`ALTER TABLE \`m_user\` DROP COLUMN \`phone\``);
    }
}
exports.Init1788532378657 = Init1788532378657;
//# sourceMappingURL=1788532378657-init.js.map