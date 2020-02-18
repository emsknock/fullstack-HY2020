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

blogSchema.set(
    "toJSON",
    {
        transform: (doc, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret._v;
        }
    }
);

export const Blog = model("Blog", blogSchema);