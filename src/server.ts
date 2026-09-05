import {env} from "./config/env";
import {app} from "./app";
import {AppDataSource} from "./Database/database";

AppDataSource.initialize().then(() => {
    console.log('Database connected');
    app.listen(env.port,
        () => console.log(`Server running on port ${env.port}`
        ));
})
.catch((error) => {
    console.log(error)
    process.exit(1);
});