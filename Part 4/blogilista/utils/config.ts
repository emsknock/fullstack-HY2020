import { error } from "./logger";

require("dotenv").config();

export const PORT = process.env.PORT ?? 3003;

export const DB_PASS = process.env.DB_PASS;
if (!DB_PASS) {
    error("No DB_PASS variable set!");
    process.exit(1);
}

export const MONGO_URL =
    `mongodb+srv://fullstack:${DB_PASS}@cluster0-x5cql.mongodb.net/blog${process.env.NODE_ENV === "test" ? "-test" : ""}?retryWrites=true&w=majority`;