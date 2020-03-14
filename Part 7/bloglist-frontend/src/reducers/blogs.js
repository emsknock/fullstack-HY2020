import axios from "axios";
import * as user from "../utils/storage-user";
import { setNotification } from "./notification";

const BASE_URL = "/api/blogs";
const defaultState = [];

const config = () => {
    const token = user.load().token ?? null;
    if (!token) return {};
    return {
        headers: {
            Authorization: `bearer ${token}`
        }
    };
}

export const initialiseBlogs = () => async dispatch => {
    const { data } = await axios.get(BASE_URL, config());
    dispatch({
        type: "SET_BLOGS",
        data,
    });
};
export const createBlog = (blog) => async dispatch => {
    const { data } = await axios.post(BASE_URL, blog, config());
    dispatch({
        type: "ADD_BLOG",
        data,
    });
    dispatch(setNotification(`Added blog "${blog.title}"`));
};
export const removeBlog = (data) => async dispatch => {
    await axios.delete(`${BASE_URL}/${data.id}`, config());
    dispatch({
        type: "REMOVE_BLOG",
        data,
    });
    dispatch(setNotification(`Removed blog "${data.title}"`));
};
export const likeBlog = (blog) => async dispatch => {
    const data = { ...blog, likes: blog.likes + 1 };
    await axios.put(
        `${BASE_URL}/${blog.id}`,
        { ...data, user: blog.user.id },
        config()
    );
    dispatch({
        type: "UPDATE_BLOG",
        data,
    });
    dispatch(setNotification(`Liked "${blog.title}"`));
};
export const addComment = (blog, comment) => async dispatch => {
    const { data } = await axios.post(
        `${BASE_URL}/${blog.id}/comments`,
        { comment },
        config()
    );
    dispatch({
        type: "UPDATE_BLOG",
        data,
    });
}

export default (state = defaultState, action) => {

    if (action.type === "SET_BLOGS")
        return action.data;
    if (action.type === "ADD_BLOG")
        return [...state, action.data];
    if (action.type === "REMOVE_BLOG")
        return state.filter(b => b.id !== action.data.id);
    if (action.type === "UPDATE_BLOG")
        return state.map(b => b.id === action.data.id ? action.data : b);

    return state;

}