"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1789849097956 = void 0;
class Init1789849097956 {
    name = 'Init1789849097956';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`m_budget\` CHANGE \`amount_spent\` \`amount_spent\` decimal(15,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`m_budget\` CHANGE \`amount_exceeded\` \`amount_exceeded\` decimal(15,2) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`m_budget\` CHANGE \`amount_exceeded\` \`amount_exceeded\` decimal(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`m_budget\` CHANGE \`amount_spent\` \`amount_spent\` decimal(15,2) NOT NULL`);
    }
}
exports.Init1789849097956 = Init1789849097956;
//# sourceMappingURL=1789849097956-init.js.map