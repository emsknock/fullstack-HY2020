import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Router } from "express";
import { User } from "../models/user";

const router = Router();

router.post("/", async (request, response) => {
    const { username, password } = request.body;

    const user = await User.findOne({ username });
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passHash);

    if (!user || !passwordCorrect) {
        return response.status(401).json({
            error: "invalid username or password"
        });
    }

    const userForToken = {
        username,
        id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.JWT_SECRET);

    response
        .status(200)
        .send({ token, username, name });
})

export { router as loginRouter };