import React, { useRef } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogs";

import { WithToggle } from "./WithToggle";
import { NewBlogForm } from "./NewBlogForm";

export const MainView = () => {

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