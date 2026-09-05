"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1788548840274 = void 0;
class Init1788548840274 {
    name = 'Init1788548840274';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`m_user\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`m_user\` CHANGE \`phone\` \`phone\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`m_user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`m_user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`m_user\` CHANGE \`phone\` \`phone\` varchar(255) NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`m_user\` CHANGE \`email\` \`email\` varchar(255) NOT NULL DEFAULT '1'`);
    }
}
exports.Init1788548840274 = Init1788548840274;
//# sourceMappingURL=1788548840274-init.js.map