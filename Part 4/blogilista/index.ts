import { MONGO_URL, PORT } from "./utils/config";

import http from "http";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { blogsRouter } from "./controllers/blogs";

const app = express();

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});