import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { likeBlog, removeBlog } from "../reducers/blogs";

export const BlogView = ({ blog }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(s => s.user);
    const onLike = _ => dispatch(likeBlog(blog));
    const onRemove = _ => {
        dispatch(removeBlog(blog));
        history.push("/");
    };

    if (!blog) return null;

    return <>
        <h1>{blog.title}</h1>
        <div>
            <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
            {blog.likes} likes
            <button onClick={onLike}>Like</button>
        </div>
        <div>
            {
                user.username !== blog.user.username
                    ? `Added by ${blog.user.name}`
                    : <>
                        Added by you
                        <button onClick={onRemove}>Remove</button>
                    </>
            }
        </div>
    </>

};