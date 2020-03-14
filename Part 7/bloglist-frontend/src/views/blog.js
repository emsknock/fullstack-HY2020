import React from "react";
import { useDispatch } from "react-redux";
import { likeBlog } from "../reducers/blogs";

export const BlogView = ({ blog }) => {
    
    const dispatch = useDispatch();
    const onLike = blog => dispatch(likeBlog(blog));

    if (!blog) return null;

    return <>
        <h1>{blog.title}</h1>
        <div>
            <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
            {blog.likes} likes
            <button onClick={() => onLike(blog)}>Like</button>
        </div>
        <div>
            Added by {blog.user.name}
        </div>
    </>

};