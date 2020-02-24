import jwt from "jsonwebtoken";
import { Request } from "express";

import { Router } from "express";
import { Blog } from "../models/blog";
import { User } from "../models/user";

const router = Router();

router.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user");
    response.json(blogs.map(b => b.toJSON()));
});

router.post("/", async (request, response) => {

    const { body } = request;

    if (!body.title || !body.url)
        return response.status(400).json({ error: "required field(s) missing" });

    const user = await User.findById(request.token.id);

    const blog = new Blog({
        ...request.body,
        user: user._id,
    });
    const result = await blog.save();

    const populated = await Blog.findById(result.id).populate("user");

    response.status(201).json(populated.toJSON());
});

router.delete("/:id", async (request, response) => {

    const blog = await Blog.findById(request.params.id);
    if(blog.user.toString() !== request.token.id)
        throw Error("Unauthorised remove");


    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();

});

router.put("/:id", async (request, response) => {

    await Blog.findByIdAndUpdate(request.params.id, request.body);
    response.status(204).end();

});

export { router as blogsRouter };