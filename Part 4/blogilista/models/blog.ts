import { Schema, Document, model } from "mongoose";

export interface Blog extends Document {
    title: string,
    author: string,
    url: string,
    likes: number
}

const blogSchema = new Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

export const Blog = model("Blog", blogSchema);