"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1785256821508 = void 0;
class Init1785256821508 {
    name = 'Init1785256821508';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`m_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL DEFAULT 1, \`enabled\` tinyint NOT NULL DEFAULT 1, \`locked\` tinyint NOT NULL DEFAULT 0, \`deleted\` tinyint NOT NULL DEFAULT 0, \`twoFactorEnabled\` tinyint NOT NULL DEFAULT 0, \`accountNonExpired\` tinyint NOT NULL DEFAULT 1, \`credentialsNonExpired\` tinyint NOT NULL DEFAULT 1, \`firstTimeLogin\` tinyint NOT NULL DEFAULT 1, \`failedLoginAttempts\` int NOT NULL DEFAULT '0', \`role\` enum ('ADMIN', 'USER', 'GUEST') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_c04f7e3f2f4e1d6f8540184e83\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`refresh_tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tokenHash\` varchar(255) NOT NULL, \`revoked\` tinyint NOT NULL DEFAULT 0, \`expiresAt\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_id\` int NOT NULL, UNIQUE INDEX \`IDX_c25bc63d248ca90e8dcc1d92d0\` (\`tokenHash\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` ADD CONSTRAINT \`FK_3ddc983c5f7bcf132fd8732c3f4\` FOREIGN KEY (\`user_id\`) REFERENCES \`m_user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` DROP FOREIGN KEY \`FK_3ddc983c5f7bcf132fd8732c3f4\``);
        await queryRunner.query(`DROP INDEX \`IDX_c25bc63d248ca90e8dcc1d92d0\` ON \`refresh_tokens\``);
        await queryRunner.query(`DROP TABLE \`refresh_tokens\``);
        await queryRunner.query(`DROP INDEX \`IDX_c04f7e3f2f4e1d6f8540184e83\` ON \`m_user\``);
        await queryRunner.query(`DROP TABLE \`m_user\``);
    }
}
exports.Init1785256821508 = Init1785256821508;
//# sourceMappingURL=1785256821508-init.js.map