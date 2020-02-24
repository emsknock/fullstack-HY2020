const mongoose = require("mongoose");
const supertest = require("supertest");
const { app } = require("../app");

const { Blog } = require("../models/blog");
const { initialBlogs } = require("./blog-helper");

const api = supertest(app);

beforeEach(async () => {

    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);

});

describe(
    "Blogs",
    () => {

        test(
            "are returned on get",
            async () => {
                const { body } = await api.get("/api/blogs").expect(200);
                expect(body.length).toBe(initialBlogs.length);
            }
        );

        test(
            "use \"id\" instead of \"_id\"",
            async () => {
                const { body } = await api.get("/api/blogs").expect(200);
                expect(
                    body.every(blog => ("id" in blog) && !("_id" in blog))
                ).toBe(
                    true
                );
            }
        );

        test(
            "can be posted",
            async () => {
                await api.post("/api/blogs")
                    .send({
                        title: "Test post",
                        author: "Test Author",
                        url: "https://example.com/",
                        likes: 1337
                    })
                    .expect(201);
                
                const { body } = await api.get("/api/blogs").expect(200);
                expect(body.length).toBe(initialBlogs.length + 1);
            }
        );

        test(
            "with no likes field are defaulted to zero likes",
            async () => {
                const { body: { likes } } = await api.post("/api/blogs")
                    .send({
                        title: "Test post with no likes",
                        author: "Test Author",
                        url: "https://example.com/"
                    })
                    .expect(201);
                expect(likes).toBe(0);
            }
        );

        test(
            "with no title or author get 400 response",
            async () => {
                await api.post("/api/blogs")
                    .send({ author: "Test Author" })
                    .expect(400);
            }
        )

    }
)

afterAll(() => {
    mongoose.connection.close();
});