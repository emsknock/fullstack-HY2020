import bcrypt from "bcrypt";
import { Router } from "express";

import { User } from "../models/user";

const SALT_ROUNDS = 10;
const router = Router();

router.get("/", async (req, res) => {
    const users = await User.find({});
    res.json(users.map(u => u.toJSON()));
});

router.post("/", async (req, res) => {

    const { username, name, password } = req.body;

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