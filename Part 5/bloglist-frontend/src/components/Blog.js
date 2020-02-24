import React, { useState } from "react";

const style = {
    border: "1px solid grey",
    padding: "5px",
    marginBottom: "5px",
}

const Blog = ({ blog, onLike, onRemove, currentUser }) => {

    const [isDetailed, setDetailed] = useState(false);

    return <div style={style} className="blog">
        <div>
            {blog.title} — {blog.author}
            <button onClick={() => setDetailed(s => !s)}>
                {isDetailed ? "hide" : "show"}
            </button>
        </div>
        {
            isDetailed && <>
                <div>{blog.url}</div>
                <div>
                    {blog.likes} likes
                    <button onClick={() => onLike(blog)}>Like</button>
                </div>
                <div>{blog.user.name}</div>
                {
                    currentUser.username === blog.user.username && <div>
                        <button onClick={() => onRemove(blog)}>Remove</button>
                    </div> 
                }
            </>
        }
    </div>;
}

export default Blog
