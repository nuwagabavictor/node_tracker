"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1788711431544 = void 0;
class Init1788711431544 {
    name = 'Init1788711431544';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`m_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`enabled\` tinyint NOT NULL DEFAULT 1, \`locked\` tinyint NOT NULL DEFAULT 0, \`deleted\` tinyint NOT NULL DEFAULT 0, \`twoFactorEnabled\` tinyint NOT NULL DEFAULT 0, \`accountNonExpired\` tinyint NOT NULL DEFAULT 1, \`accountNonLocked\` tinyint NOT NULL DEFAULT 1, \`credentialsNonExpired\` tinyint NOT NULL DEFAULT 1, \`firstTimeLogin\` tinyint NOT NULL DEFAULT 1, \`failedLoginAttempts\` int NOT NULL DEFAULT '0', \`lock_until\` datetime NULL, \`role\` enum ('ADMIN', 'USER', 'GUEST', 'DRIVER', 'OPERATOR', 'COMPANY', 'SUPER_ADMIN', 'RIDER') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_c04f7e3f2f4e1d6f8540184e83\` (\`email\`), UNIQUE INDEX \`IDX_efcf184b50a0d1fcc60fadcc2b\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`m_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`category_name\` varchar(100) NOT NULL, \`category_type\` enum ('INCOME', 'EXPENSE') NOT NULL, \`category_description\` varchar(255) NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`user_id\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_f51a200161d42d50bfdc6b1917\` (\`user_id\`, \`category_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`m_transaction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` decimal(15,2) NOT NULL, \`type\` enum ('INCOME', 'EXPENSE') NOT NULL, \`description\` varchar(255) NULL, \`category_id\` int NOT NULL, \`user_id\` int NOT NULL, \`transactionDate\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`two_factor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`otpHash\` varchar(255) NOT NULL, \`user_id\` int NOT NULL, \`expiresAt\` datetime NOT NULL, \`used\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_162c7f53b41b84102a8e06eff1\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`refresh_tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tokenHash\` varchar(255) NOT NULL, \`revoked\` tinyint NOT NULL DEFAULT 0, \`expiresAt\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_id\` int NOT NULL, UNIQUE INDEX \`IDX_c25bc63d248ca90e8dcc1d92d0\` (\`tokenHash\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`m_password_token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`otpHash\` varchar(255) NOT NULL, \`revoked\` tinyint NOT NULL DEFAULT 0, \`expiresAt\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX \`IDX_c64d8ce5ba57835b9ac49b0a8a\` (\`user_id\`), UNIQUE INDEX \`IDX_de510e5e92d0c3dab6dde01f48\` (\`otpHash\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`m_notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`entity\` varchar(100) NOT NULL, \`entity_id\` int NOT NULL, \`action\` varchar(255) NOT NULL, \`message\` varchar(255) NOT NULL, \`is_system_generated\` tinyint NOT NULL, \`user_id\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`m_notification_mapper\` (\`id\` int NOT NULL AUTO_INCREMENT, \`notification_id\` int NOT NULL, \`user_id\` int NOT NULL, \`is_read\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX \`IDX_ab58ff0b0bbd3c7b44e596a32c\` (\`notification_id\`), INDEX \`IDX_e05420b7957da1fe3d2e5bc015\` (\`user_id\`), UNIQUE INDEX \`IDX_91ff11d050969e89a09dd11b9f\` (\`user_id\`, \`notification_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`m_document\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(150) NOT NULL, \`file_name\` varchar(255) NOT NULL, \`parent_entity_type\` varchar(100) NOT NULL, \`parent_entity_id\` bigint NOT NULL, \`size\` bigint NOT NULL, \`location\` varchar(500) NOT NULL, \`description\` text NULL, \`mimeType\` varchar(100) NOT NULL, \`storage_type\` enum ('FILESYSTEM', 'S3', 'R2') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_a0d2e16602cda03e1870b5945b\` (\`parent_entity_type\`, \`parent_entity_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`m_kyc_document\` (\`id\` int NOT NULL AUTO_INCREMENT, \`document_type\` enum ('NATIONAL_ID', 'PASSPORT', 'DRIVERS_LICENSE', 'PROOF_OF_ADDRESS', 'SELFIE_WITH_ID', 'VEHICLE_REGISTRATION', 'VEHICLE_INSURANCE', 'BUSINESS_REGISTRATION_CERT', 'TAX_PIN_CERTIFICATE', 'DIRECTOR_ID') NOT NULL, \`status\` enum ('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING', \`rejection_reason\` text NULL, \`reviewed_at\` datetime NULL, \`reviewed_by\` bigint NULL, \`submitted_by\` bigint NULL, \`approved_by\` bigint NULL, \`approved_at\` datetime NULL, \`rejected_by\` bigint NULL, \`rejected_at\` datetime NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`kyc_profile_id\` int NULL, \`document_id\` int NULL, UNIQUE INDEX \`IDX_7adbfe6a2264aefdd0cf405756\` (\`kyc_profile_id\`, \`document_type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`m_kyc_profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`subject_type\` enum ('OPERATOR', 'DRIVER', 'COMPANY') NOT NULL, \`subject_id\` bigint NOT NULL, \`status\` enum ('INCOMPLETE', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'EXPIRED') NOT NULL DEFAULT 'INCOMPLETE', \`rejection_reason\` text NULL, \`reviewed_at\` datetime NULL, \`submitted_at\` datetime NULL, \`reviewed_by\` bigint NULL, \`expires_at\` timestamp NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_ef43298d30a77092bd9ee9d699\` (\`subject_type\`, \`subject_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`m_configuration\` (\`id\` int NOT NULL AUTO_INCREMENT, \`config_name\` varchar(255) NOT NULL, \`string_value\` varchar(255) NULL, \`user_id\` int NOT NULL, \`is_enabled\` tinyint NOT NULL DEFAULT 0, \`is_system_generated\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_af9e161166c9db4876dc2f5777\` (\`user_id\`, \`config_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`m_budget\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` decimal(15,2) NOT NULL, \`category_id\` int NOT NULL, \`user_id\` int NOT NULL, \`active\` tinyint NOT NULL, \`period\` enum ('WEEKLY', 'MONTHLY', 'YEARLY') NOT NULL DEFAULT 'WEEKLY', \`start_date\` date NOT NULL, \`end_date\` date NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_c0beb20f3f44a54b28d8decd62\` (\`user_id\`, \`category_id\`, \`start_date\`, \`end_date\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`m_category\` ADD CONSTRAINT \`FK_54b0d7c2b0096e17a4f97142dd3\` FOREIGN KEY (\`user_id\`) REFERENCES \`m_user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`m_transaction\` ADD CONSTRAINT \`FK_f60d380dcdf90dbadc856c2e72b\` FOREIGN KEY (\`category_id\`) REFERENCES \`m_category\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`m_transaction\` ADD CONSTRAINT \`FK_a5295a18c25ee7feb03557d02c4\` FOREIGN KEY (\`user_id\`) REFERENCES \`m_user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`two_factor\` ADD CONSTRAINT \`FK_162c7f53b41b84102a8e06eff18\` FOREIGN KEY (\`user_id\`) REFERENCES \`m_user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` ADD CONSTRAINT \`FK_3ddc983c5f7bcf132fd8732c3f4\` FOREIGN KEY (\`user_id\`) REFERENCES \`m_user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`m_password_token\` ADD CONSTRAINT \`FK_c64d8ce5ba57835b9ac49b0a8ab\` FOREIGN KEY (\`user_id\`) REFERENCES \`m_user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`m_notification_mapper\` ADD CONSTRAINT \`FK_ab58ff0b0bbd3c7b44e596a32c5\` FOREIGN KEY (\`notification_id\`) REFERENCES \`m_notification\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`m_notification_mapper\` ADD CONSTRAINT \`FK_e05420b7957da1fe3d2e5bc015e\` FOREIGN KEY (\`user_id\`) REFERENCES \`m_user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`m_kyc_document\` ADD CONSTRAINT \`FK_ac93315acd28b7b440ff772a3b9\` FOREIGN KEY (\`kyc_profile_id\`) REFERENCES \`m_kyc_profile\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`m_kyc_document\` ADD CONSTRAINT \`FK_112206f9367d4114ed708ae0347\` FOREIGN KEY (\`document_id\`) REFERENCES \`m_document\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`m_configuration\` ADD CONSTRAINT \`FK_b60c9edb8126463e80d46d6ca47\` FOREIGN KEY (\`user_id\`) REFERENCES \`m_user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`m_budget\` ADD CONSTRAINT \`FK_d9e53d1fb0cbbedb5b45972e2e8\` FOREIGN KEY (\`category_id\`) REFERENCES \`m_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`m_budget\` ADD CONSTRAINT \`FK_92d0cb6177c4b47cb6240b59e2e\` FOREIGN KEY (\`user_id\`) REFERENCES \`m_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`m_budget\` DROP FOREIGN KEY \`FK_92d0cb6177c4b47cb6240b59e2e\``);
        await queryRunner.query(`ALTER TABLE \`m_budget\` DROP FOREIGN KEY \`FK_d9e53d1fb0cbbedb5b45972e2e8\``);
        await queryRunner.query(`ALTER TABLE \`m_configuration\` DROP FOREIGN KEY \`FK_b60c9edb8126463e80d46d6ca47\``);
        await queryRunner.query(`ALTER TABLE \`m_kyc_document\` DROP FOREIGN KEY \`FK_112206f9367d4114ed708ae0347\``);
        await queryRunner.query(`ALTER TABLE \`m_kyc_document\` DROP FOREIGN KEY \`FK_ac93315acd28b7b440ff772a3b9\``);
        await queryRunner.query(`ALTER TABLE \`m_notification_mapper\` DROP FOREIGN KEY \`FK_e05420b7957da1fe3d2e5bc015e\``);
        await queryRunner.query(`ALTER TABLE \`m_notification_mapper\` DROP FOREIGN KEY \`FK_ab58ff0b0bbd3c7b44e596a32c5\``);
        await queryRunner.query(`ALTER TABLE \`m_password_token\` DROP FOREIGN KEY \`FK_c64d8ce5ba57835b9ac49b0a8ab\``);
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` DROP FOREIGN KEY \`FK_3ddc983c5f7bcf132fd8732c3f4\``);
        await queryRunner.query(`ALTER TABLE \`two_factor\` DROP FOREIGN KEY \`FK_162c7f53b41b84102a8e06eff18\``);
        await queryRunner.query(`ALTER TABLE \`m_transaction\` DROP FOREIGN KEY \`FK_a5295a18c25ee7feb03557d02c4\``);
        await queryRunner.query(`ALTER TABLE \`m_transaction\` DROP FOREIGN KEY \`FK_f60d380dcdf90dbadc856c2e72b\``);
        await queryRunner.query(`ALTER TABLE \`m_category\` DROP FOREIGN KEY \`FK_54b0d7c2b0096e17a4f97142dd3\``);
        await queryRunner.query(`DROP INDEX \`IDX_c0beb20f3f44a54b28d8decd62\` ON \`m_budget\``);
        await queryRunner.query(`DROP TABLE \`m_budget\``);
        await queryRunner.query(`DROP INDEX \`IDX_af9e161166c9db4876dc2f5777\` ON \`m_configuration\``);
        await queryRunner.query(`DROP TABLE \`m_configuration\``);
        await queryRunner.query(`DROP INDEX \`IDX_ef43298d30a77092bd9ee9d699\` ON \`m_kyc_profile\``);
        await queryRunner.query(`DROP TABLE \`m_kyc_profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_7adbfe6a2264aefdd0cf405756\` ON \`m_kyc_document\``);
        await queryRunner.query(`DROP TABLE \`m_kyc_document\``);
        await queryRunner.query(`DROP INDEX \`IDX_a0d2e16602cda03e1870b5945b\` ON \`m_document\``);
        await queryRunner.query(`DROP TABLE \`m_document\``);
        await queryRunner.query(`DROP INDEX \`IDX_91ff11d050969e89a09dd11b9f\` ON \`m_notification_mapper\``);
        await queryRunner.query(`DROP INDEX \`IDX_e05420b7957da1fe3d2e5bc015\` ON \`m_notification_mapper\``);
        await queryRunner.query(`DROP INDEX \`IDX_ab58ff0b0bbd3c7b44e596a32c\` ON \`m_notification_mapper\``);
        await queryRunner.query(`DROP TABLE \`m_notification_mapper\``);
        await queryRunner.query(`DROP TABLE \`m_notification\``);
        await queryRunner.query(`DROP INDEX \`IDX_de510e5e92d0c3dab6dde01f48\` ON \`m_password_token\``);
        await queryRunner.query(`DROP INDEX \`IDX_c64d8ce5ba57835b9ac49b0a8a\` ON \`m_password_token\``);
        await queryRunner.query(`DROP TABLE \`m_password_token\``);
        await queryRunner.query(`DROP INDEX \`IDX_c25bc63d248ca90e8dcc1d92d0\` ON \`refresh_tokens\``);
        await queryRunner.query(`DROP TABLE \`refresh_tokens\``);
        await queryRunner.query(`DROP INDEX \`IDX_162c7f53b41b84102a8e06eff1\` ON \`two_factor\``);
        await queryRunner.query(`DROP TABLE \`two_factor\``);
        await queryRunner.query(`DROP TABLE \`m_transaction\``);
        await queryRunner.query(`DROP INDEX \`IDX_f51a200161d42d50bfdc6b1917\` ON \`m_category\``);
        await queryRunner.query(`DROP TABLE \`m_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_efcf184b50a0d1fcc60fadcc2b\` ON \`m_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_c04f7e3f2f4e1d6f8540184e83\` ON \`m_user\``);
        await queryRunner.query(`DROP TABLE \`m_user\``);
    }
}
exports.Init1788711431544 = Init1788711431544;
//# sourceMappingURL=1788711431544-init.js.map