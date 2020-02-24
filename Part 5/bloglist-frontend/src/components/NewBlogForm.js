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
            <input id="new-blog-title" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
            <span>Author</span>
            <input id="new-blog-author" value={author} onChange={e => setAuthor(e.target.value)} />
        </div>
        <div>
            <span>URL</span>
            <input id="new-blog-url" value={url} onChange={e => setUrl(e.target.value)} />
        </div>
        <input id="new-blog-submit" type="submit" value="Create" />
    </form>

}