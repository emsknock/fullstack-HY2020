import React, { useState } from "react";

export const NewBlogForm = ({ onCreate }) => {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({ title, author, url });
    }

    return <form onSubmit={handleSubmit}>
        <div>
            <span>Title</span>
            <input value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
            <span>Author</span>
            <input value={author} onChange={e => setAuthor(e.target.value)} />
        </div>
        <div>
            <span>URL</span>
            <input value={url} onChange={e => setUrl(e.target.value)} />
        </div>
        <input type="submit" value="Create" />
    </form>

}