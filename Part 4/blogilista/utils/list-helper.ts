import { Blog } from "../models/blog";

export const totalLikes = (blogs: Blog[]) =>
    blogs.reduce(
        (count, { likes }) => count + likes,
        0
    );

export const favouriteBlog = (blogs: Blog[]) =>
    blogs.length < 1
        ? undefined
        : blogs.reduce(
            (bestBlog, currentBlog) =>
                currentBlog.likes > bestBlog.likes
                    ? currentBlog
                    : bestBlog
        );