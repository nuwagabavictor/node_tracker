import 'reflect-metadata';
import { env } from "../config/env";
import { join } from 'path'
import { DataSource } from 'typeorm'


const isCompiled = __filename.endsWith(".js");

const entityPath = isCompiled
    ? "../Entities/*.js"
    : "../Entities/*.ts";

const migrationPath = isCompiled
    ? "migrations/*.js"
    : "migrations/*.ts";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: env.dbHost,
    username: env.dbUser,
    password: env.dbPass,
    database: env.dbName,
    port: env.dbPort,
    // Pin the connection/table collation to match the tables already in this database
    // (utf8mb4_general_ci) — the schema's own default is utf8mb4_unicode_ci, and letting
    // new tables drift onto that default breaks foreign keys against existing id columns.
    charset: 'utf8mb4',
    synchronize: false,
    migrationsRun: false,
    logging: false,
    // synchronize: true, // false in prod
    entities: [
        join(__dirname, entityPath)
    ],

    migrations: [
        join(__dirname, migrationPath)
    ]

})