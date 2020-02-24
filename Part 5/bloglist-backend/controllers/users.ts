import bcrypt from "bcrypt";
import { Router } from "express";

import { User } from "../models/user";

const SALT_ROUNDS = 10;
const router = Router();

router.get("/", async (req, res) => {
    const users = await User.find({}).populate("blogs");
    res.json(users.map(u => u.toJSON()));
});

router.post("/", async (req, res) => {

    const { username, name, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            error: "must specify username and password"
        });
    }

    if (username.length < 3 || password.length < 3) {
        return res.status(400).json({
            error: "username and password must be at least 3 characters long"
        });
    }

    if ((await User.find({ username })).length > 0) {
        return res.status(400).json({
            error: "username already exists"
        });
    }

    const passHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = new User({
        username,
        name,
        passHash,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser.toJSON());

});

export { router as usersRouter }