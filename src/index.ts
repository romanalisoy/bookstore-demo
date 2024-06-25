/// <reference path="../types/index.ts">
import "reflect-metadata";
import * as dotenv from "dotenv";
import AppDataSource from "./configs/datasource.config";
import {checkOrCreateDatabase} from "./utils/db";
import server from "./configs/app.config";
import process from "process";

dotenv.config();

// Load server
server.listen(process.env.APP_PORT ?? 3000, () => {
    console.log(
        `server running : http://localhost:${process.env.APP_PORT ?? 3000}`
    );
});

checkOrCreateDatabase().then(() => {
    AppDataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized!");
        })
        .catch((err) => {
            console.error("Error during Data Source initialization:", err);
        });
});

