"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const env_1 = require("../config/env");
const path_1 = require("path");
const typeorm_1 = require("typeorm");
const isCompiled = __filename.endsWith(".js");
const entityPath = isCompiled
    ? "../Entities/*.js"
    : "../Entities/*.ts";
const migrationPath = isCompiled
    ? "migrations/*.js"
    : "migrations/*.ts";
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: env_1.env.dbHost,
    username: env_1.env.dbUser,
    password: env_1.env.dbPass,
    database: env_1.env.dbName,
    port: env_1.env.dbPort,
    // Pin the connection/table collation to match the tables already in this database
    // (utf8mb4_general_ci) — the schema's own default is utf8mb4_unicode_ci, and letting
    // new tables drift onto that default breaks foreign keys against existing id columns.
    charset: 'utf8mb4',
    synchronize: false,
    migrationsRun: false,
    logging: false,
    // synchronize: true, // false in prod
    entities: [
        (0, path_1.join)(__dirname, entityPath)
    ],
    migrations: [
        (0, path_1.join)(__dirname, migrationPath)
    ]
});
//# sourceMappingURL=database.js.map