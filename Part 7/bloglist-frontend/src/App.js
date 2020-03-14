import React, { useEffect, useRef } from "react";
import { Switch, Route, Redirect, Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { UserView } from "./views/user";
import { UserStatsView } from "./views/stats";

import { initialiseBlogs, createBlog } from "./reducers/blogs";
import { login, initialiseUser, logout } from "./reducers/user";
import { initialiseUserStats } from "./reducers/user-stats";

import { LoginForm } from "./components/LoginForm";
import { NewBlogForm } from "./components/NewBlogForm";
import { WithToggle } from "./components/WithToggle";
import { Notification } from "./components/Notification";
import { BlogView } from "./views/blog";

const MainView = () => {

    const dispatch = useDispatch();

    const blogs = useSelector(s => s.blogs);

    const blogFormRef = useRef(null);

    const onCreate = blog => {
        dispatch(createBlog(blog));
        blogFormRef.current.setOpen(false);
    }

    return <>
        <h2>Create new blog</h2>
        <WithToggle label="New Blog" ref={blogFormRef}>
            <NewBlogForm onCreate={onCreate} />
        </WithToggle>
        <h2>Blogs</h2>
        <ul>
            {
                blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map(blog =>
                        <li key={blog.id}>
                            <Link to={`/blogs/${blog.id}`}>
                                {blog.title} by {blog.user.name}
                            </Link>
                        </li>
                    )
            }
        </ul>
    </>;
}

const App = () => {

    const dispatch = useDispatch();
    const userMatch = useRouteMatch("/users/:id");
    const blogMatch = useRouteMatch("/blogs/:id");

    useEffect(() => { dispatch(initialiseBlogs()) }, [dispatch]);
    useEffect(() => { dispatch(initialiseUser()) }, [dispatch]);
    useEffect(() => { dispatch(initialiseUserStats()) }, [dispatch]);

    const stats = useSelector(s => s.userStats);
    const blogs = useSelector(s => s.blogs);
    const auth = useSelector(s => s.user);

    const onLogin = creds => dispatch(login(creds));
    const onLogout = _ => dispatch(logout());

    const user = userMatch
        ? stats.find(u => u.id === userMatch.params.id)
        : null;
    const blog = blogMatch
        ? blogs.find(b => b.id === blogMatch.params.id)
        : null;

    return <>
        {
            auth === null
                ? <>
                    <Notification />
                    <LoginForm onLogin={onLogin} />
                </>
                : <>
                    <header>
                        <Link to="/users">Users</Link>
                        <Link to="/blogs">Blogs</Link>
                        {auth.name} Logged in
                        <button onClick={onLogout}>Logout</button>
                    </header>
                    <Notification />
                    <h1>Blog app</h1>
                    <Switch>
                        <Route path="/users/:id"><UserView user={user} /></Route>
                        <Route path="/users"><UserStatsView stats={stats} /></Route>
                        <Route path="/blogs/:id"><BlogView blog={blog} /></Route>
                        <Route path="/blogs"><MainView /></Route>
                        <Redirect to="/blogs" />
                    </Switch>
                </>
        }
    </>;
}

export default App;