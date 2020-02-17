import http from "http";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { MONGO_URL, PORT } from "./utils/config";

const app = express();

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

const Blog = mongoose.model("Blog", blogSchema);

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

app.get("/api/blogs", (request, response) =>
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
);

app.post("/api/blogs", (request, response) => {
    const blog = new Blog(request.body);
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});