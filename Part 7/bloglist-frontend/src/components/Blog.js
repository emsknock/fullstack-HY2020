import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useField } from "../hooks/use-field";
import { likeBlog, removeBlog, addComment } from "../reducers/blogs";

export const BlogView = ({ blog }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const comment = useField("text");

    const user = useSelector(s => s.user);
    const onLike = _ => dispatch(likeBlog(blog));
    const onRemove = _ => {
        dispatch(removeBlog(blog));
        history.push("/");
    };
    const onComment = e => {
        e.preventDefault();
        dispatch(addComment(blog, comment.value));
    }

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
        <h2>Comments</h2>
        <form onSubmit={onComment}>
            <input name="comment" {...comment} />
            <button>Add comment</button>
        </form>
        <ul>
            {blog.comments?.map(c => <li key={c}>{c}</li>)}
        </ul>
    </>

};