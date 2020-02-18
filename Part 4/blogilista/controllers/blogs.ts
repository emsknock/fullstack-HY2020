import { Router } from "express";
import { Blog } from "../models/blog";

const router = Router();

router.get("/", (request, response) =>
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs.map(b => b.toJSON()))
        })
);

router.post("/", (request, response) => {
    const blog = new Blog(request.body);
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        });
});

export { router as blogsRouter };