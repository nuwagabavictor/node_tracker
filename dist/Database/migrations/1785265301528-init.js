"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1785265301528 = void 0;
class Init1785265301528 {
    name = 'Init1785265301528';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`two_factor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`otpHash\` varchar(255) NOT NULL, \`user_id\` int NOT NULL, \`expiresAt\` datetime NOT NULL, \`used\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_162c7f53b41b84102a8e06eff1\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`two_factor\` ADD CONSTRAINT \`FK_162c7f53b41b84102a8e06eff18\` FOREIGN KEY (\`user_id\`) REFERENCES \`m_user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`two_factor\` DROP FOREIGN KEY \`FK_162c7f53b41b84102a8e06eff18\``);
        await queryRunner.query(`DROP INDEX \`IDX_162c7f53b41b84102a8e06eff1\` ON \`two_factor\``);
        await queryRunner.query(`DROP TABLE \`two_factor\``);
    }
}
exports.Init1785265301528 = Init1785265301528;
//# sourceMappingURL=1785265301528-init.js.map