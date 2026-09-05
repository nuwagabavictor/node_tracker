"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./config/env");
const app_1 = require("./app");
const database_1 = require("./Database/database");
database_1.AppDataSource.initialize().then(() => {
    console.log('Database connected');
    app_1.app.listen(env_1.env.port, () => console.log(`Server running on port ${env_1.env.port}`));
})
    .catch((error) => {
    console.log(error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map