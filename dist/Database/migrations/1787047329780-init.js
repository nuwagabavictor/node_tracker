"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1787047329780 = void 0;
class Init1787047329780 {
    name = 'Init1787047329780';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`m_password_token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`otpHash\` varchar(255) NOT NULL, \`revoked\` tinyint NOT NULL DEFAULT 0, \`expiresAt\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX \`IDX_c64d8ce5ba57835b9ac49b0a8a\` (\`user_id\`), UNIQUE INDEX \`IDX_de510e5e92d0c3dab6dde01f48\` (\`otpHash\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`m_document\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(150) NOT NULL, \`file_name\` varchar(255) NOT NULL, \`parent_entity_type\` varchar(100) NOT NULL, \`parent_entity_id\` bigint NOT NULL, \`size\` bigint NOT NULL, \`location\` varchar(500) NOT NULL, \`description\` text NULL, \`mimeType\` varchar(100) NOT NULL, \`storage_type\` enum ('FILESYSTEM', 'S3', 'R2') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_a0d2e16602cda03e1870b5945b\` (\`parent_entity_type\`, \`parent_entity_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`m_kyc_document\` (\`id\` int NOT NULL AUTO_INCREMENT, \`document_type\` enum ('NATIONAL_ID', 'PASSPORT', 'DRIVERS_LICENSE', 'PROOF_OF_ADDRESS', 'SELFIE_WITH_ID', 'VEHICLE_REGISTRATION', 'VEHICLE_INSURANCE', 'BUSINESS_REGISTRATION_CERT', 'TAX_PIN_CERTIFICATE', 'DIRECTOR_ID') NOT NULL, \`status\` enum ('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING', \`rejection_reason\` text NULL, \`reviewed_at\` datetime NULL, \`reviewed_by\` bigint NULL, \`submitted_by\` bigint NULL, \`approved_by\` bigint NULL, \`approved_at\` datetime NULL, \`rejected_by\` bigint NULL, \`rejected_at\` datetime NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`kyc_profile_id\` int NULL, \`document_id\` int NULL, UNIQUE INDEX \`IDX_7adbfe6a2264aefdd0cf405756\` (\`kyc_profile_id\`, \`document_type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`m_kyc_profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`subject_type\` enum ('OPERATOR', 'DRIVER', 'COMPANY') NOT NULL, \`subject_id\` bigint NOT NULL, \`status\` enum ('INCOMPLETE', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'EXPIRED') NOT NULL DEFAULT 'INCOMPLETE', \`rejection_reason\` text NULL, \`reviewed_at\` datetime NULL, \`submitted_at\` datetime NULL, \`reviewed_by\` bigint NULL, \`expires_at\` timestamp NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_ef43298d30a77092bd9ee9d699\` (\`subject_type\`, \`subject_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`m_user\` ADD \`accountNonLocked\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`m_user\` ADD \`lock_until\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`m_user\` CHANGE \`role\` \`role\` enum ('ADMIN', 'USER', 'GUEST', 'DRIVER', 'OPERATOR', 'COMPANY', 'SUPER_ADMIN', 'RIDER') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`m_password_token\` ADD CONSTRAINT \`FK_c64d8ce5ba57835b9ac49b0a8ab\` FOREIGN KEY (\`user_id\`) REFERENCES \`m_user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`m_kyc_document\` ADD CONSTRAINT \`FK_ac93315acd28b7b440ff772a3b9\` FOREIGN KEY (\`kyc_profile_id\`) REFERENCES \`m_kyc_profile\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`m_kyc_document\` ADD CONSTRAINT \`FK_112206f9367d4114ed708ae0347\` FOREIGN KEY (\`document_id\`) REFERENCES \`m_document\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`m_kyc_document\` DROP FOREIGN KEY \`FK_112206f9367d4114ed708ae0347\``);
        await queryRunner.query(`ALTER TABLE \`m_kyc_document\` DROP FOREIGN KEY \`FK_ac93315acd28b7b440ff772a3b9\``);
        await queryRunner.query(`ALTER TABLE \`m_password_token\` DROP FOREIGN KEY \`FK_c64d8ce5ba57835b9ac49b0a8ab\``);
        await queryRunner.query(`ALTER TABLE \`m_user\` CHANGE \`role\` \`role\` enum ('ADMIN', 'USER', 'GUEST') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`m_user\` DROP COLUMN \`lock_until\``);
        await queryRunner.query(`ALTER TABLE \`m_user\` DROP COLUMN \`accountNonLocked\``);
        await queryRunner.query(`DROP INDEX \`IDX_ef43298d30a77092bd9ee9d699\` ON \`m_kyc_profile\``);
        await queryRunner.query(`DROP TABLE \`m_kyc_profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_7adbfe6a2264aefdd0cf405756\` ON \`m_kyc_document\``);
        await queryRunner.query(`DROP TABLE \`m_kyc_document\``);
        await queryRunner.query(`DROP INDEX \`IDX_a0d2e16602cda03e1870b5945b\` ON \`m_document\``);
        await queryRunner.query(`DROP TABLE \`m_document\``);
        await queryRunner.query(`DROP INDEX \`IDX_de510e5e92d0c3dab6dde01f48\` ON \`m_password_token\``);
        await queryRunner.query(`DROP INDEX \`IDX_c64d8ce5ba57835b9ac49b0a8a\` ON \`m_password_token\``);
        await queryRunner.query(`DROP TABLE \`m_password_token\``);
    }
}
exports.Init1787047329780 = Init1787047329780;
//# sourceMappingURL=1787047329780-init.js.map