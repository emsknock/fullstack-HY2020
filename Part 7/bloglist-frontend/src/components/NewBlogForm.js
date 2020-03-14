import React, { useState } from "react";
import styled from "styled-components";

const Label = styled.div`
    margin-top: 0.8rem;
    font-size: 0.8rem;
    color: #333;
`;
const GreenBtn = styled.button`background-color: #9f9`;

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
            <Label>Title</Label>
            <input id="new-blog-title" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
            <Label>Author</Label>
            <input id="new-blog-author" value={author} onChange={e => setAuthor(e.target.value)} />
        </div>
        <div>
            <Label>URL</Label>
            <input id="new-blog-url" value={url} onChange={e => setUrl(e.target.value)} />
        </div>
        <GreenBtn id="new-blog-submit">Create</GreenBtn>
    </form>

}