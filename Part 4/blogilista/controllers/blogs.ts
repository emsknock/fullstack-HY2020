import { Router } from "express";

const router = Router();

router.get("/", (request, response) =>
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
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