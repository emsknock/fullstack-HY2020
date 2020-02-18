import jwt from "jsonwebtoken";
import { Request } from "express";

import { Router } from "express";
import { Blog } from "../models/blog";
import { User } from "../models/user";

const router = Router();

const getRequestToken = (request: Request) => {
    const auth = request.get("authorization");
    return auth && auth.toLowerCase().startsWith("bearer")
        ? auth.substring(7)
        : null;
};


router.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user");
    response.json(blogs.map(b => b.toJSON()));
});

router.post("/", async (request, response) => {

    const { body } = request;
    const token = getRequestToken(request);

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
    if (!token || !decodedToken.id)
        return response.status(401).json({ error: "token missing or invalid" });

    if (!body.title || !body.url)
        return response.status(400).json({ error: "required field(s) missing" });

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
        ...request.body,
        user: user._id,
    });
    const result = await blog.save();

    response.status(201).json(result.toJSON());
});

router.delete("/:id", async (request, response) => {

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();

});

router.put("/:id", async (request, response) => {

    await Blog.findByIdAndUpdate(request.params.id, request.body);
    response.status(204).end();

});

export { router as blogsRouter };