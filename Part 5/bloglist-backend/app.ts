import { IS_TESTING, MONGO_URL } from "./utils/config";

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { blogsRouter } from "./controllers/blogs";
import { usersRouter } from "./controllers/users";
import { loginRouter } from "./controllers/login";

import { tokenExtractor, errorHandler } from "./utils/middleware";
import { testingRouter } from "./controllers/testing";

require("express-async-errors");

mongoose.connect(
    MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }
);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
if (IS_TESTING) {
    app.use("/api/testing", testingRouter);
}

app.use(tokenExtractor);

app.use("/api/blogs", blogsRouter);

app.use(errorHandler);

export { app };