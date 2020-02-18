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
    if (!request.body.title || !request.body.url)
        return response.status(400).json({ error: "required field(s) missing" });

    const blog = new Blog(request.body);
    blog
        .save()
        .then(result => {
            response.status(201).json(result.toJSON())
        })
});

export { router as blogsRouter };