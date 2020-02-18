const mongoose = require("mongoose");
const supertest = require("supertest");
const { app } = require("../app");

const { User } = require("../models/user");

const api = supertest(app);

beforeEach(async () => {

    await User.deleteMany({});
    const foobar = new User({
        "blogs": [],
        "username": "foobar",
        "name": "Foo Bar",
        // Original password: hunter2
        "passHash": "$2b$10$QdbwWhjxw211nDZQuU5lqelVvg.xs9vdxIvyLJced9/xaA9ZwJX1u",
    });

    await foobar.save();

});

describe(
    "Users",
    () => {

        test(
            "can be listed",
            async () => {
                const { body } = await api.get("/api/users").expect(200);
                expect(body.length).toBe(1);
            }
        );

        test(
            "can be created",
            async () => {
                await api.post("/api/users")
                    .send({
                        username: "testuser",
                        name: "Test User",
                        password: "correct battery horse staple"
                    })
                    .expect(201);
                const { body } = await api.get("/api/users").expect(200);
                expect(body.length).toBe(2);
            }
        );

        test(
            "must have username and password",
            async () => {
                await api.post("/api/users")
                    .send({
                        name: "Test User",
                        password: "correct battery horse staple"
                    })
                    .expect(400);
                await api.post("/api/users")
                    .send({
                        username: "testuser",
                        name: "Test User",
                    })
                    .expect(400);
            }
        );

        test(
            "must have username and password with more than 3 characters",
            async () => {
                await api.post("/api/users")
                    .send({
                        username: "ab",
                        name: "Test User",
                        password: "correct battery horse staple"
                    })
                    .expect(400);
                await api.post("/api/users")
                    .send({
                        username: "testuser",
                        name: "Test User",
                        password: "ab"
                    })
                    .expect(400);
            }
        );

    }
)

afterAll(() => {
    mongoose.connection.close();
});