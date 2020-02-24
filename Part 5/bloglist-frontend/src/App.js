import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import userService from "./services/user";
import { LoginForm } from "./components/LoginForm";
import { NewBlogForm } from "./components/NewBlogForm";
import { WithToggle } from "./components/WithToggle";

const App = () => {

    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [toast, setToast] = useState(null);
    const blogFormRef = useRef(null);

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
            setToast("Incorrect credentials");
            setTimeout(() => setToast(null), 3000);
        }
    };
    const handleLogout = () => {
        window.localStorage.setItem("auth", "");
        window.location.reload();
    };

    const handleBlogCreation = async (blog) => {
        blogFormRef.current.setOpen(false);
        const data = await blogService.create(blog);
        setBlogs(o => [...o, data]);
        setToast(`Created: ${data.title}`);
        setTimeout(() => setToast(null), 3000);
    };
    const handleBlogLike = async (blog) => {
        const newBlog = { ...blog, likes: blog.likes + 1 };
        const data = await blogService.update(newBlog);
        setBlogs(o => o.map(b => b.id !== blog.id ? b : data));
    };
    const handleBlogRemove = async (blog) => {
        await blogService.remove(blog);
        setBlogs(o => o.filter(b => b.id !== blog.id));
    };

    return <>
        {toast}
        {user === null
            ? <LoginForm onLogin={handleLogin} />
            : <div>
                <h2>User</h2>
                <div>
                    {user.username}
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <h2>Create new blog</h2>
                <WithToggle label="New Blog" ref={blogFormRef}>
                    <NewBlogForm onCreate={handleBlogCreation} />
                </WithToggle>
                <h2>Blogs</h2>
                {
                    blogs
                        .sort((a, b) => b.likes - a.likes)
                        .map(blog => <Blog
                            key={blog.id}
                            blog={blog}
                            onLike={handleBlogLike}
                            currentUser={user}
                            onRemove={handleBlogRemove}
                        />)
                }
            </div>
        }
    </>;
}

export default App;