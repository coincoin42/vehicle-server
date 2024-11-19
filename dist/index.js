"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const app_1 = require("./app");
async function main() {
    let port = 8080;
    if (process.env.PORT) {
        port = parseInt(process.env.PORT, 10);
    }
    const db = await (0, database_1.connectDb)((0, database_1.dbConfigFromEnv)());
    (0, app_1.setupApp)(db).listen(port, () => {
        console.log(`Server is running on port ${port.toString()}`);
    });
}
main().catch((e) => { console.error(`Something went wrong ${e}`); });
