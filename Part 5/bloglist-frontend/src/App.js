import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import userService from "./services/user";
import { LoginForm } from "./components/LoginForm";
import { NewBlogForm } from "./components/NewBlogForm";

const App = () => {

    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(
        () => {
            if (user !== null)
                blogService.getAll().then(blogs =>
                    setBlogs(blogs)
                );
        },
        [user]
    );

    useEffect(
        () => {
            if (user !== null)
                window.localStorage.setItem("auth", JSON.stringify(user));
        },
        [user]
    );

    useEffect(
        () => {
            const authJson = window.localStorage.getItem("auth");
            if (authJson) {
                const u = JSON.parse(authJson);
                blogService.setToken(u.token);
                setUser(u);
            }
        },
        []
    );

    const handleLogin = async credentials => {
        try {
            const u = await userService.login(credentials);

            blogService.setToken(u.token);
            setUser(u);
        } catch (e) {

        }
    };
    const handleLogout = () => {
        window.localStorage.setItem("auth", "");
        window.location.reload();
    };

    const handleBlogCreation = async (blog) => {
        const data = await blogService.create(blog);
        setBlogs(o => [...o, data]);
    };  

    return user === null
        ? <LoginForm onLogin={handleLogin} />
        : <div>
            <h2>User</h2>
            <div>
                {user.username}
                <button onClick={handleLogout}>Logout</button>
            </div>
            <h2>Create new blog</h2>
            <NewBlogForm onCreate={handleBlogCreation} />
            <h2>Blogs</h2>
            {
                blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )
            }
        </div>;
}

export default App;