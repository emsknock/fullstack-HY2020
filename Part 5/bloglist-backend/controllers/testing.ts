import { Router } from "express";

import { Blog } from "../models/blog";
import { User } from "../models/user";

const router = Router();

router.post("/reset", async (request, response) => {
    await Promise.all([
        Blog.deleteMany({}),
        User.deleteMany({})
    ]);
    response.status(204).end();
})

export { router as testingRouter };