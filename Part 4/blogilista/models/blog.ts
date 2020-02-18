import { Schema, Document, model } from "mongoose";

export interface Blog extends Document {
    title: string,
    author: string,
    url: string,
    likes: number
}

const blogSchema = new Schema({
    title: String,
    url: String,
    likes: {
        type: Number,
        required: false,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

blogSchema.set(
    "toJSON",
    {
        transform: (doc, ret) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
        }
    }
);

export const Blog = model<Blog>("Blog", blogSchema);