import { MONGO_URL } from "./utils/config";

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { blogsRouter } from "./controllers/blogs";
import { errorHandler } from "./controllers/errors";
import { usersRouter } from "./controllers/users";

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
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter)

app.use(errorHandler);

export { app };