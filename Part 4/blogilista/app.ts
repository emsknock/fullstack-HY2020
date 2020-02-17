import { MONGO_URL } from "./utils/config";

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { blogsRouter } from "./controllers/blogs";

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

export { app };